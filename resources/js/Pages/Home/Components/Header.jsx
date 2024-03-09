import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import Weather from "./Weather";

const navigation = [
    { name: "Tentang", href: "#" },
    { name: "Prakiraan", href: "#" },
    { name: "Pelayanan", href: "#" },
    { name: "Publikasi", href: "#" },
    { name: "Dokumen Kinerja", href: "#" },
    { name: "Kontak", href: "#" },
];

export default function Header({ title, url }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <>
            <Head title={title} />
            <div className="h-screen bg-gray-900">
                <header className="absolute inset-x-0 top-0 z-50 mx-auto md:w-4/6">
                    <nav
                        className="flex items-center justify-between p-6 lg:px-8"
                        aria-label="Global"
                    >
                        <div className="flex lg:flex-1">
                            <a
                                href="#"
                                className="-m-1.5 p-2 bg-white rounded-md flex gap-2"
                            >
                                <img
                                    className="w-auto h-8"
                                    src="https://www.bmkg.go.id/asset/img/logo/logo-bmkg.svg"
                                    alt=""
                                />
                                <img
                                    className="w-auto h-8"
                                    src="/assets/img/berakhlak.webp"
                                    alt=""
                                />
                                <span className="sr-only">
                                    Stasiun Meteorologi Tunggul Wulung
                                </span>
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-semibold leading-6 text-white"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a
                                href="#"
                                className="text-sm font-semibold leading-6 text-white"
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </nav>
                    <Dialog
                        as="div"
                        className="lg:hidden"
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                    >
                        <div className="fixed inset-0 z-50" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="-m-1.5 p-1.5 flex gap-2 bg-white rounded-md"
                                >
                                    <span className="sr-only">
                                        Stasiun Meteorologi Tunggul Wulung
                                    </span>
                                    <img
                                        className="w-auto h-8"
                                        src="https://www.bmkg.go.id/asset/img/logo/logo-bmkg.svg"
                                        alt=""
                                    />
                                    <img
                                        className="w-auto h-8"
                                        src="/assets/img/berakhlak.webp"
                                        alt=""
                                    />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="flow-root mt-6">
                                <div className="-my-6 divide-y divide-gray-500/25">
                                    <div className="py-6 space-y-2">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-gray-800"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>

                <div className="relative h-screen overflow-hidden isolate pt-14">
                    <div className="absolute inset-0 bg-black -z-10 bg-opacity-80"></div>
                    <img
                        src="https://cdn.bmkg.go.id/Web/21A1621.jpg"
                        alt=""
                        className="absolute inset-0 object-cover w-full h-full -z-20"
                    />
                    <div
                        className="absolute inset-x-0 overflow-hidden -top-40 -z-20 transform-gpu blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-40">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative px-3 py-1 text-sm leading-6 text-gray-400 rounded-full ring-1 ring-white/10 hover:ring-white/20">
                                Informasi Peringatan Dini Cuaca.{" "}
                                <a
                                    href="https://nowcasting.bmkg.go.id/nowcast/"
                                    className="font-semibold text-white"
                                >
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    Klik Disini{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="p-2 text-center sm:p-0">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">
                                Stasiun Meteorologi Tunggul Wulung - Cilacap
                            </h1>
                            <p className="px-4 mt-6 leading-8 text-gray-300 text-md sm:text-lg">
                                Welcome to Tunggul Wulung Meteorological
                                Station. Knows The Weather Make Your Flight
                                Better
                            </p>
                            <Weather url={url} />
                            <div className="flex items-center justify-center mt-10 gap-x-6">
                                {/* <a
                                    href="#"
                                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    Realtime Data
                                </a> */}
                                <a
                                    href="#"
                                    className="text-sm font-semibold leading-6 text-white"
                                >
                                    Info Bandara Tunggul Wulung{" "}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
