import CountDown from "@/lib/components/CountDown";
import FormConfirmation from "@/lib/components/FormConfirmation";
import FormWishes from "@/lib/components/FormWishes";
import ModalTamu from "@/lib/components/ModalTamu";
import WeddingGift from "@/lib/components/WeddingGift";
import Wishes from "@/lib/components/Wishes";
import Image from "next/image";

export default function Home({ params }: { params: { group: string, groupName: string } }) {
  const group = params.group ?? '-';

  return (
    <section className="bg-[#161d28]">
      <ModalTamu group={group} groupName={params.groupName} />
      <header className="flex justify-center items-center w-full h-[calc(100vh-50px)] relative">
        <div className="bg-accent opacity-60 bg-[url(/images/header-photo.png)] md:bg-[0_70%] bg-cover bg-center w-full h-full absolute z-0" ></div>
        <div className="bg-[#15264872] opacity-50 w-full h-full absolute left-0 top-0 z-10"></div>
        <section className="container relative h-full z-20 flex justify-center items-center">
          <div className="text-white text-center relative z-10" >
            <h2 className='text-sm mb-10'>The Wedding Of</h2>
            <h1 className='font-strawberrycupcakes text-5xl md:text-8xl mb-5'>Zul & Eka</h1>
          </div>
        </section>
      </header>
      <section className="bg-[url(/images/background-surat.png)] bg-blend-multiply bg-accent py-10 px-10 bg-cover">
        <div className="w-full container flex justify-center items-center flex-col">
          <div className="relative py-16">
            <Image className="absolute z-0 top-0" src="/images/bunga-1.webp" width={129} height={181} alt="bunga" />
            <h3 className="font-edensor text-white z-10 relative text-6xl">Z & E</h3>
          </div>
          <p className="text-center mb-5 text-white font-light">
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri,
            supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.
            Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.
          </p>
          <h5 className="text-white italic" >~ Ar-Rum 21 ~</h5>
        </div>
      </section>
      <section className="bg-gray-100 bg-[url(/images/background-surat.png)] bg-blend-multiply bg-cover py-20 px-10 relative">
        <div className=" absolute w-full h-full opacity-70 bg-gradient-to-b from-[#FFFFFF94] to-white left-0 top-0 z-0" >
        </div>
        <div className="flex container justify-center items-center flex-col z-10 relative">
          <div>
            <h4 className="text-center mb-5 text-3xl font-medium font-analogue text-[#D7AC64]">
              Our Special Day
            </h4>
            <p className="text-center text-sm text-accent">
              Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta Kerabat sekalian untuk menghadiri acara pernikahan kami:
            </p>
          </div>
          <div className="flex gap-10 mt-10 flex-col md:flex-row">
            <div className="flex flex-col justify-center group items-center">
              <div className="mb-5 rounded-md overflow-hidden border-2 group-hover:border-accent">
                <Image src={'/images/Zul.jpg'} width={180} height={251} alt="cowo" />
              </div>
              <div className="text-center text-sm text-accent">
                <h3 className="text-3xl mb-3 font-analogue">
                  Zul Faza Makarima
                </h3>
                <p>
                  Putra Pertama dari Bapak Hery Prasetiyo & Ibu Halimatus Sa’diyah
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center group items-center">
              <div className="mb-5 rounded-md overflow-hidden border-2 group-hover:border-accent">
                <Image src={'/images/Eka.jpg'} width={180} height={251} alt="cowo" />
              </div>
              <div className="text-center text-sm text-accent">
                <h3 className="text-3xl mb-3 font-analogue">
                  Eka Rahayu
                </h3>
                <p>
                  Putri Pertama dari Bapak Joko Libra Susilo & Ibu Vivi Gumanti
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="bg-white relative flex flex-col justify-center items-center bg-[url(/images/Background-countdown.jpg)] bg-cover bg-no-repeat bg-[0_60%]" >
        <div className="container flex justify-center items-center min-h-96 py-20 px-10">
          <div className="bg-[#152648] opacity-50 w-full h-full absolute left-0 top-0 z-0"></div>
          <div className="z-10 relative" >
            <h3 className="text-4xl text-center text-[#D5AF6F] font-strawberrycupcakes mb-5">Save The Date</h3>
            <CountDown />
          </div>
        </div>
      </section>
      <section className="bg-accent bg-[url(/images/texure-1.png)] bg-cover bg-blend-lighten relative py-20 px-10">
        <div className="z-10 relative container">
          <div className="flex flex-col md:flex-row items-stretch gap-6 mb-6">
            <div className="px-5 py-10 rounded-2xl w-full bg-white bg-cover flex flex-col items-center justify-center">
              <h4 className="text-center font-analogue text-[#D7AC64] text-3xl mb-5">Akad Nikah & Resepsi</h4>
              <h5 className="text-center mb-3 italic text-xs text-accent">MINGGU</h5>
              <h3 className="text-center font-analogue text-[#D7AC64] text-5xl mb-5">18</h3>
              <h5 className="text-center mb-3 italic text-xs text-accent">FEBRUARI 2024</h5>
              <p className="italic text-center text-sm text-accent">Pukul : 07.30 – 09.00 WIB</p>
            </div>
            <div className="px-5 py-10 rounded-2xl w-full bg-white text-center bg-cover">
              <h4 className="font-analogue text-[#D7AC64] text-3xl mb-5">Lokasi</h4>
              <h3 className="font-sans font-medium text-accent text-4xl mb-5">Gedung Islamic Center Tuparev</h3>
              <h5 className="mb-5 italic text-xs text-accent">Jl. Simega III No.46, Kertawinangun, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat.</h5>
              <a className="bg-accent bg-opacity-100 hover:bg-opacity-85 transition-colors py-1 px-5 rounded-xl text-white" href="https://maps.app.goo.gl/wP6yKjpZkA8FNzn8A" target="_blank" rel="noopener noreferrer">Google Maps</a>
            </div>
          </div>
          <div className="px-5 py-10 rounded-2xl bg-white bg-cover">
            <h4 className="text-center font-analogue text-[#D7AC64] text-3xl mb-5">Wedding Gift</h4>
            <p className="italic text-center text-sm text-accent mb-5">
              Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.
              Dan jika memberi adalah ungkapan tanda kasih Anda,
              Anda dapat memberi kado secara cashless.
            </p>
            <WeddingGift />
          </div>
        </div>
      </section>
      <section className="bg-white bg-cover py-20 px-10 relative">
        <FormConfirmation group={group} />
        <FormWishes />
        <Wishes />
      </section>
    </section>
  );
}

