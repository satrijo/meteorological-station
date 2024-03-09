import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({ url }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [metar, setMetar] = useState({});

    const dateNow = new Date();
    const timestamp = parseInt(dateNow.getTime() / 1000 - 3600);

    const fetchList = async () => {
        setLoading(true);
        const { data } = await axios.get(url + "/api/weather?area=cilacap");
        setMetar(metar);
        setList(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchList();
    }, [url]);

    return (
        <>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    100: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        slidesPerGroup: 2,
                    },
                    900: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        slidesPerGroup: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        slidesPerGroup: 3,
                    },
                }}
                className="mt-8"
                modules={[Autoplay]}
            >
                {loading ? (
                    // Display a loading indicator or message while fetching data
                    <p className="m-auto text-white">Loading...</p>
                ) : (
                    Object.keys(list).map(
                        (post) =>
                            // When dateNow is equal or less then list[post].timestamp, display the data
                            timestamp < list[post].timestamp && (
                                <SwiperSlide key={post} id={list[post].waktu}>
                                    <div className="relative flex flex-col justify-center px-2 pt-4 pb-4 overflow-hidden bg-white bg-opacity-20 isolate rounded-2xl">
                                        <div className="flex flex-col items-center overflow-hidden text-sm text-white">
                                            <div className="flex items-center mx-auto text-base font-semibold">
                                                {weatherInfo(
                                                    list[post].weather
                                                )}
                                            </div>
                                            <div className="flex pt-3 pb-2 mx-auto">
                                                <img
                                                    src={`https://s3.dapur.cloud/weather/am/${list[post].weather}.png`}
                                                    className="h-14"
                                                />
                                            </div>
                                            <div className="flex items-center mx-auto mb-5 text-base font-semibold">
                                                {list[post].t[0]}°C
                                            </div>

                                            <div className="flex justify-between gap-5">
                                                <div className="flex items-center mx-auto text-xs">
                                                    {list[post].jam} WIB
                                                </div>
                                                <div className="flex items-center mx-auto text-xs">
                                                    {list[post].waktu}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                    )
                )}
            </Swiper>
        </>
    );
}

const weatherInfo = (id) => {
    id = parseInt(id);

    switch (id) {
        case 0:
            return "Cerah";
        case 1:
            return "Cerah Berawan";
        case 2:
            return "Cerah Berawan";
        case 3:
            return "Berawan";
        case 4:
            return "Berawan Tebal";
        case 5:
            return "Udara Kabur";
        case 10:
            return "Asap";
        case 45:
            return "Kabut";
        case 60:
            return "Hujan Ringan";
        case 61:
            return "Hujan Sedang";
        case 63:
            return "Hujan Lebat";
        case 80:
            return "Hujan Lokal";
        case 95:
            return "Hujan Petir";
        case 97:
            return "Hujan Petir";
        default:
            return "Unknown";
    }
};
