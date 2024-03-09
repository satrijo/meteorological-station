<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class WeatherController extends Controller
{
    private const BMKG_API_URL = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTengah.xml';

    private $httpClient;

    public function __construct(Http $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function getWeather(Request $request)
    {
        $request->validate([
            'area' => 'required'
        ]);

        $area = $this->formatArea($request->area);
        $data = $this->fetchWeatherData();

        $areaData = collect($data['forecast']['area'])->firstWhere('@attributes.description', $area);
        $cuacaHourly = $this->processHourlyData($areaData['parameter']);

        $mergedData = $this->mergeHourlyData($cuacaHourly);

        return $mergedData;
    }

    private function formatArea($area)
    {
        return ucwords(strtolower($area));
    }

    private function fetchWeatherData()
    {
        $response = Http::get(self::BMKG_API_URL);
        $xml = simplexml_load_string($response->body());

        return json_decode(json_encode($xml), true);
    }

    private function processHourlyData($parameters)
    {
        $validIds = ['t', 'weather', 'wd', 'ws', 'hu'];

        return collect($parameters)
            ->filter(function ($value) use ($validIds) {
                return in_array($value['@attributes']['id'], $validIds);
            })
            ->mapWithKeys(function ($value) {
                return [
                    $value['@attributes']['id'] => collect($value['timerange'])->map(function ($item) {
                        return [
                            'type' => $item['@attributes']['type'],
                            'h' => $item['@attributes']['h'],
                            'datetime' => $item['@attributes']['datetime'],
                            'value' => $item['value'] ?? null
                        ];
                    })->toArray(),
                ];
            });
    }

    private function mergeHourlyData($cuacaHourly)
    {
        $mergedData = [];

        $cuacaHourly->each(function ($items, $key) use (&$mergedData) {
            foreach ($items as $element) {
                $index = $element['h'];
                $string_waktu = $element['datetime'];

                $mergedData = $this->formatMergedData($element, $mergedData, $index, $string_waktu, $key);
            }
        });

        return $mergedData;
    }
    private function formatMergedData($element, $mergedData, $index, $string_waktu, $key)
    {
        $tahun = substr($string_waktu, 0, 4);
        $bulan = substr($string_waktu, 4, 2);
        $hari = substr($string_waktu, 6, 2);
        $jam = substr($string_waktu, 8, 2);

        $tanggal_str = "{$tahun}-{$bulan}-{$hari} {$jam}:00:00";
        $timestamp = strtotime($tanggal_str);

        if (!isset($mergedData[$index])) {
            $mergedData[$index] = [
                'waktu' => Carbon::parse($tanggal_str)->setTimezone('Asia/Jakarta')->format('d M Y'),
                'tahun' => date('Y', $timestamp),
                'bulan' => date('m', $timestamp),
                'hari' => date('d', $timestamp),
                'jam' => Carbon::parse($tanggal_str)->setTimezone('Asia/Jakarta')->format('H:i'),
                'h' => $element['h'],
                'timestamp' => $timestamp,
            ];
        }
        $mergedData[$index][$key] = $element['value'];

        return $mergedData;
    }
}
