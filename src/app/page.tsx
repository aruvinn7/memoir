"use client";

import { Timeline } from "@/components/ui/timeline";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { PixelImage } from "@/components/magicui/pixel-image";
import ShinyText from "@/components/ui/shinytext";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Heart, Music } from "lucide-react";
import { VideoText } from "@/components/magicui/video-text";
import PinGuard from "@/components/ui/PinGuard"
const timelineData = [
  {
    title: "15 September 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        Masih inget ga aku bangunin kamu pagi-pagi buat ke dieng terus kita cfd-an
      </p>
    ),
    image: ["/memories/15sep.jpg"]
  },
  {
    title: "17 September 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        Ini pertama kali kita ke Alfa X hehehehehe kita ngerjain po yaa kalo gasalah itu terus sorenya ke UM keliling
      </p>
    ),
    image: ["/memories/17sep.jpg"]
  },
  {
    title: "22 September 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita soree soree jalan ke UM kita yang ke tempat duduk ituu terus kita saling ngatain tulisan jelek, anw bagusan tulisanku tetep wleee. tapi tapi disini kita uda mulai deket kemana mana bareng terus tapi takut keliatan sama orang WKWKKWKW
      </p>
    ),
    image: ["/memories/22sep.jpg"]
  },
  {
    title:  (  <div>
      <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-black tracking-wider drop-shadow-sm">
        29 September 2024
      </span>
      <span className="block text-sm font-medium text-pink-400 mt-1 animate-pulse">
        💕 Happy Birthday Sayang 💕
      </span>
    </div>),
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        Ini hari pas increase kegiatan pertamaa, kita di tempatnya rey kan yaa, terus disini awkward banget pas dateng karena kita dateng berdua terus kegep sama abdul lagi WKWKWKKW terus malam malamnya baru jalan jalan deee. KAMU ULANG TAHUN LOO INIII inget ga kamu malem sebelumnya gamau makan gamau keluar terus minum obat iiii terus aku beliin donat biar ga makan obat lagi.
      </p>
    ),
    image: ["/memories/29seps1.jpg", "/memories/29seps2.jpg", "/memories/29seps3.jpg", "/memories/29seps4.jpg"]
  },
  {
    title: (  <div>
      <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-black tracking-wider drop-shadow-sm">
        29 September 2024
      </span>
      <span className="block text-sm font-medium text-pink-400 mt-1 animate-pulse">
        💕 Happy Birthday Sayang 💕
      </span>
    </div>),
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        Ini pulang dari increase kita jalan-jalan entah kenapa tapi kalo gasalah itu karena pengen sambil belajar katanya WKWKKWKW
      </p>
    ),
    image: ["/memories/29sepm1.jpg", "/memories/29sepm2.jpg", "/memories/29sepm3.jpg", "/memories/29sepm4.jpg"]
  },
  {
    title: "6 Oktober 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        KITA JALAN JALAN KE DIENG, mana masih temenan lagi ahahahhaa emang boleh seberduaan ini, disini kamu masih ada kue habis ulang tahun and then kamu ga bakal kemakan katanya yaudah kita nugas bisa bisanya sambil jalan-jalan, ini pas sore-sore banyak orang bawa anjing jalan-jalan, terus aku ada videonya masih
      </p>
    ),
    image: ["/memories/6okt.jpg", "/memories/6okt1.jpg"]
  },
  {
    title: "13 Oktober 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita ke HINDIA buat ngerjain tugas padahal pengen spend timer together wokwoskskw you looks so pretty in this photooooo still got in my top 5 photos of you, jangan liat aku btw aowkkwkw itu kacamatanya ilang kampret
      </p>
    ),
    image: ["/memories/13oktolive.jpg", "/memories/13oktalvin.jpg"]
  },
  {
    title: "26 November 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        inget ga ini kamu foto dimanaa, di matosss ini kita besoknya habis confess OMG MASIH MALU ingetnya, you look so pretty tooo here. always sih gapernah engga. siap siap habis ini banyak kejutan WKWKKWKWKW
      </p>
    ),
    image: ["/memories/26nov.jpg"]
  },
  {
    title: "4 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini aku inget banget kamu udah bisa ngambek ga diajak keluar, jadi aku jajan di lawson terus katanya gabilang, terus ngambek astaga kangennya. terus aku ke kosanmu de dan kita makan eskrim di lawson, kita makan mnagnum yang matcha sama yang manggo hohhohoho. omaigat itu leherku kenapa ya
      </p>
    ),
    image: ["/memories/4dec.jpg","/memories/4dec1.jpg"]
  },
  {
    title: "8 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita pulang malem banget habis bucinnn wokskskso terus foto depan dcozzy ups
      </p>
    ),
    image: ["/memories/8dec1.jpg"]
  },
  {
    title: "9 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        besoknyaa kita ngebucinn di burger king dan this is our godly photos HAHAHHHAHA never i forget it, ini pas banget kita lagi belajar matop, aku masih ada videonya dan still bikin reflek tiduran setiap nontonnya heheheheheh
      </p>
    ),
    image: ["/memories/9dec1.jpg", "/memories/9dec2.jpg","/memories/9dec3.jpg","/memories/9dec4.jpg","/memories/9dec5.jpg"]
  },
  {
    title: "13 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita hujan hujannn terus jalan jalan di kayutangan first time, hihi di kiss hihi, hihi, terus itu apa ya ewkwkwkkw gatel gatel
      </p>
    ),
    image: ["/memories/13dec1.jpg", "/memories/10dec1.jpg"]
  },
  {
    title: "14 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        HAHAHHAHAHAH ini kamu pusinnggg ngurusin RAB increase dan marah kalo ga dipegang tangannya, anjrlah aku kangen banget nulis ini semua
      </p>
    ),
    image: ["/memories/14dec2.jpg"]
  },
  {
    title: "15 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        This is the day maybe we would never forget its really like im in love song with you. kita ngisi formulir bca dan kocaknya malah terlengah soalnya formnya ditutup dan aku kagum banget disini sama kamu karena kamu bilang jangan panik vin, panik gabakal bawa kita kemana-mana damn i still remember that words from u, you always made me mesmerized, the last photo was my literal goddess, shes my Alexandra💕
      </p>
    ),
    image: ["/memories/15dec.jpg", "/memories/15dec2.jpg","/memories/15dec3.jpg","/memories/15dec4.jpg","/memories/15dec5.jpg","/memories/15dec7.jpg","/memories/15dec9.jpg","/memories/15dec11.jpg"]
  },
  {
    title: "15 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini besok siangnya kita bangun siang terus makan ayam bakar plekenut yeeyyy, tepuk tangan. terus kita first time ketemu tempat meng bucin di taman ijen. and this is feel like im in the romance movie my hand held by you tightly. malamnya eh jalan jalan lagi ke family mart WKWKWKW
      </p>
    ),
    image: ["/memories/15decs11.jpg","/memories/15decs.jpg", "/memories/15decs1.jpg","/memories/15decs2.jpg", "/memories/15decs3.jpg","/memories/15decs4.jpg","/memories/15decs5.jpg","/memories/15decs6.jpg","/memories/15decs7.jpg","/memories/15decs8.jpg","/memories/15decs12.jpg"]
  },
  {
    title: "17 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        Ini pas kita ngambil lpj an buat ayam ayam ituuu sampe bela belain gatau kemana dah itu aku aja bahkan gainget, terus kita mampir ke kue kapas malang ini deee dan take a cute picture
      </p>
    ),
    image: ["/memories/16dec1.jpg","/memories/16dec2.jpg","/memories/16dec3.jpg"]
  },
  {
    title: "17 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        wowksksksk ada yang makan brutal sambil sebeng
      </p>
    ),
    image: ["/memories/17dec.jpg"]
  },
  {
    title: "19 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        kita jalan jalan di UB in nightss, terus cape terus duduk bentar di belakang filkom, terus kamu kiss, tapi diliatin kucing 
      </p>
    ),
    image: ["/memories/19dec1.jpg", "/memories/19dec.jpg"]
  },
  {
    title: "21 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini gatau kenapa dah ngantuk mulu, aib wleee
      </p>
    ),
    image: ["/memories/21dec.jpg"]
  },
  {
    title: "23 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        hiksss terakhir ketemu sama kamuu sebelum kamu ke surabayaa, disini ada videonya yang lucu banget, aku mau masukin tapi besar banget mb nya yaallah, kamu bilang liat aja nanti aku bakalan glowup terus aku bilang ditunggu olive glowup terus kamu langsung bilang OH berarti sekarang jele? im dead bruh. i missss youuuu so muchhh hiksss T_T i miss when you being clingy
      </p>
    ),
    image: ["/memories/23dec.jpg", "/memories/23dec1.jpg"]
  },
  {
    title: "31 December 2024",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        yahhh udah ldr, hiks ga ketemu kamu lagi, akhirnya kita discord disini kamu lagi di apartemen surabaya, dan aku besoknya pulang ke Lombok
      </p>
    ),
    image: ["/memories/31dec.jpg"]
  },
  {
    title: "22 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        AKHIRNYA BERENTI LDR OMAIGATTTT SENENG BANGETTT, huhuhuhu akhirnya bisa ketmu kamu lagi T_T, kita ketemuan di cafe 1922 ituu, disini kamu sibuknyee lagi zoom terus sambil pegangan tangan de bucinnya sama hihihi kiss kecil. teruss pas itu hujan deresss banget sampe jam 11 an baru deh kita pulang eits ga pulang tapi kita jalan jalan dulu ke kayutangan ke mumuso and take a cute picture heheheh. sumpaaa itu foto kamu yang nyander di aku pake gaya bocil lucuuuu bangett
      </p>
    ),
    image: ["/memories/22jan.jpg", "/memories/22jan1.jpg", "/memories/22jan2.jpg", "/memories/22jan3.jpg", "/memories/22jan4.jpg", "/memories/22jan5.jpg", "/memories/22jan6.jpg", "/memories/22jan7.jpg", "/memories/22jan8.jpg","/memories/22jan9.jpg","/memories/22jan10.jpg", "/memories/22jan11.jpg"]
  },
  {
    title: "24 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        besoknyaa kita revisit Hindia HAHAHAHHAHAH mau ngulang jaman pas temenan dan kita beli strawberry milkshake
      </p>
    ),
    image: ["/memories/24jan.jpg"]
  },
  {
    title: "25 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        THIS DAY WE TOOK A LOT PICTURE MWAHAHAAHA. AND WE STROLLING AROUND SAMPE HUJAN HUJANAN HAHAHAHAH, kita awalnya ke tempat parfum dan disitu ketemu mas faiq samsa mba regita, terus mau cari makan dee bingung kemanaa mau ke dikichi. nahh pas di jalan deket patung pesawat malahan hujan deres banget banget dan kita neduh, akhirnya gabut dan take picture. ada yang pamer kuku ges. YOU LOOK SO BEAUTIFUL HERE because your slightly damp, damn you look like a model in magazine, and amazingly i have uuuuuuuuuuu omaigat i loveee youuu so muchhh
      </p>
    ),
    image: ["/memories/25jan.jpg","/memories/25jan1.jpg","/memories/25jan3.jpg","/memories/25jan4.jpg","/memories/25jan5.jpg","/memories/25jan6.jpg","/memories/25jan7.jpg","/memories/25jan8.jpg","/memories/25jan9.jpg","/memories/25jan10.jpg","/memories/25jan11.jpg","/memories/25jan12.jpg","/memories/25jan13.jpg"]
  },
  {
    title: "26 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini besoknya kita nyobain rumah makan baru yang buka di malang, Jatiangor, and i take some cute photo of you hehehehhe, cantik. dan jadi pp kamu terus kamu post di ig. terus disini kita jalan-jalan habis makan karena gamau langsung pulaaangg noooo, kita ke kayutangan ke see some accesories and cute items, habis itu sorenya kita ke UM kalo kamu inget dan kita bikin video fitcheck AHAHHAHAHAHAH aku mau masukin video lohh tapi gabisa gede bangett
      </p>
    ),
    image: ["/memories/26jan.jpg","/memories/26jan1.jpg","/memories/26jan2.jpg","/memories/26jan3.jpg","/memories/26jan4.jpg","/memories/26jan5.jpg","/memories/26jan6.jpg","/memories/26jan7.jpg","/memories/26jan8.jpg","/memories/26jan9.jpg","/memories/26jan10.jpg","/memories/26jan11.jpg","/memories/26jan12.jpg", "/memories/26jan13.jpg"]
  },
  {
    title: "27 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        yakannn ngantuk lagii iniii, ketiduran dia bisa bisanya wokssksk
      </p>
    ),
    image: ["/memories/27jan.jpg"]
  },
  {
    title: "31 Januari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        OMAIGAD kenapa metal begini tangannya, wleee aib wleee, btw kita ini cari makan jauh banget sampe ke suhat dan sampailah di mangloo
      </p>
    ),
    image: ["/memories/31jan.jpg"]
  },
  {
    title: "1 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        INGETTT INI TIDAKKKK. KITA BIKIN TIKTOK I WANT U TO KNOWWWWWW~~~~ terus kita jalan jalan pulangnya beli coklat dubai kamuuu terus kamu kasih aku karena ga habis kacau
      </p>
    ),
    image: ["/memories/1feb.jpg","/memories/2feb.jpg","/memories/1feb2.jpg","/memories/1feb3.jpg",]
  },
  {
    title: "4 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini di TAMAN MERJOSARI gatau aku diapaapain dah disini, nurut aja lagi
      </p>
    ),
    image: ["/memories/5feb.jpg","/memories/5feb1.jpg",]
  },
  {
    title: "5 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        first time berantem hikss di burgerking..... maaff yaaa... terus akhirnya baikan bentar terus berantem lagi terus kita ke ijen duduk. ini yang tiba tiba diusir sama polisi ituu looo WKKWKWKW
      </p>
    ),
    image: ["/memories/5feb2.jpg","/memories/5feb3.jpg"]
  },
  {
    title: "6 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        besoknyaaa setelah berantem untungnya tidak berkelanjutan huhuhuhu, kita jalan jalan lagi dee ini kita kekosku dulu ambil jakett terus kita ke tomorro coffe deh sekalian nugas, itu sampe jam 2 kayanya
      </p>
    ),
    image: ["/memories/6feb.jpg","/memories/6feb1.jpg","/memories/6feb2.jpg","/memories/6feb3.jpg"]
  },
  {
    title: "7 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini besoknyaaa, kamu cerita lagi stress banget hari ini, dan pengen jalan-jalan so i take you ke alun-alun. anw ini pertama kali kita ke alun-alun. dan ternyata banyak tempat main disanaa terus kamu disini lagi pengen cari mainan gitu katanya yang bisa distraksi pikiran kemana-mana terus kaya buku yang interaktif tapi berujung beli hello kitty dee lucuuuu, itu mukanya serius banget deh. BTW AKU MASIH ADA HELLO KITTY NYA
      </p>
    ),
    image: ["/memories/7feb.jpg","/memories/7feb1.jpg","/memories/7feb2.jpg","/memories/7feb3.jpg"]
  },
  {
    title: "9 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        hiksssss senenggg aku dapet hadiah dari kamuuuu, ini kado dari kamuuu HIHIHIHII ini pas kamu balik ke surabaya bentar and then surprsingly pas mau pulang kamu bilang jangan pulang dulu, terus tiba-tiba bawain HADIHAHHH aku first time dapet love letter hihihhiii terus aku dibeliin beng beng kesukaanku terus ada pocky terus ada juga gantungan capybara. btw masih ada juga gantungannya di laci aku. terus adaaa penyegar ruangannya jugaaa tapi dah habiss huhuhu. terusss ada coklat silverqueen. i feel loved sekalii hihihiihihihihiihih
      </p>
    ),
    image: ["/memories/9feb.jpg","/memories/9feb1.jpg","/memories/9feb2.jpg","/memories/9feb3.jpg"]
  },
  {
    title: "12 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita foto di losik pas asisten day terus malemnya kita jalan-jalan dee. YOU LOOOK LIKE BADDIE IN THIS PHOTO OMAIGAD MY GIRLFRIEND CAN BE EVERYTHING
      </p>
    ),
    image: ["/memories/12feb.jpg","/memories/12feb1.jpg","/memories/12feb2.jpg","/memories/12feb3.jpg","/memories/12feb4.jpg","/memories/12feb5.jpg","/memories/12feb6.jpg","/memories/12feb7.jpg","/memories/12feb8.jpg", "/memories/12feb9.jpg", "/memories/12feb10.jpg"]
  },
  {
    title: "13 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kitaa di audit kalo gasalah nyiapin training apa yaaa, dia sengaja ges ngefull in hpku, ini kalo di galeri banyakk banget sumpa
      </p>
    ),
    image: ["/memories/13feb.jpg",]
  },
  {
    title: "14 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita makan di hotplate terus sama sama ga mood makan inget banget aku kita berdua. terus sorenya fotostudio deee
      </p>
    ),
    image: ["/memories/14feb.jpg","/memories/14feb1.jpg","/memories/14feb2.jpg","/memories/14feb3.jpg",]
  },
  {
    title: "15 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        YESSS burgerking lagiii HAHAHAHAHAH omaigatt this is my favorite photo of us jugaaa, sangat sangat lucu dan bucin mweheheheh
      </p>
    ),
    image: ["/memories/15feb.jpg","/memories/15feb1.jpg"]
  },
  {
    title: "22 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
      ini kita jalan jalan ke gedung merah dan kamu bawa boneka kura-kura terus dipasangin de ke kucing, mana kucingnya keasikan lagi astaga mainin kura-kuranya. last slide photo buset da itu kaya momong bayi, mother of cat.
      </p>
    ),
    image: ["/memories/22feb.jpg","/memories/22feb1.jpg","/memories/22feb2.jpg","/memories/22feb3.jpg","/memories/22feb4.jpg","/memories/22feb6.jpg"]
  },
  {
    title: "23 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita ke tempat print-print an terus aku ketiduran aowkwkwkwk terlelap sikit maaf, malah difoto foto kampret lah tapi gapapa lucu. terus sorenya karena cape dan lapar akhirnya kita memutuskan buat beliiii SHOGOKUU all time favorite haahahhaha terus bingung makan dimana akhirnya ke merjo deehh, disini kita ngobrol soal kayanya memang harus jam segini deh jalan jalan normalnya WKWKWKKWKW terlalu sering jalan malem malem sampe lupa ada sore, bonus kucing slide terakhir
      </p>
    ),
    image: ["/memories/23feb.jpg","/memories/23feb1.jpg","/memories/23feb2.jpg","/memories/23feb3.jpg","/memories/23feb4.jpg","/memories/23feb5.jpg","/memories/23feb6.jpg","/memories/23feb7.jpg"]
  },
  {
    title: "24 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita malem-malem dan ada yang badmood pengen coto makassar ges, terus gatau kenapa itu tiba tiba ke rektorat terus lepasin logo ub dah WOKSKSKKS, ini juga malemnya aku ngebentak kamu hikss mintaaaa maaaafff lagiiiiii gamau ngebentak olivee sama sekaliii because she is my cutest
      </p>
    ),
    image: ["/memories/24feb.jpg","/memories/24feb1.jpg","/memories/24feb2.jpg","/memories/24feb3.jpg",]
  },
  {
    title: "26 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini after kita berantem dan pada akhirnya aku bisa ngajak kamu keluar berdua dengan iming iming aku belum makan.... akhirnya kita beli pizza kecil dan suapin kamu sumpa kamu tumben mau pas disini heran juga aku. kamu sayang sama aku ya. terus malemnya akhirnya kita ngobrol dan sayang sayangan lagi sampe jam 2 de baru pulang, omaigadd itu lucunya kaya gamau pulang
      </p>
    ),
    image: ["/memories/26feb.jpg","/memories/26feb1.jpg"]
  },
  {
    title: "27 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        besoknya kita jalan-jalan lagiii deeee ini first time kita explore-explore dimulai dari hokbennnn, jir ngiler aku pas nulis ini sumpa bahkan bisa membayangkan aku rasanya, seruuuu hihihiiihih karena sama kamu, my olive, my pretty olive
      </p>
    ),
    image: ["/memories/27feb.jpg","/memories/27feb1.jpg"]
  },
  {
    title: "28 Februari 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ahihihihi tebak dimanaaa ini, yaapp ini di batu kita jalan jalan di plaza nya hohohohoho, kok ga foto banyak ya di galeri ku
      </p>
    ),
    image: ["/memories/28feb.jpg","/memories/28feb1.jpg"]
  },
  {
    title: "1 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita mau pulangg dari nginep di villa pas upgradingg, ini diaaaa top 2 photo of us, kamu kaya bocil sumpa lucu banget kalo pake helm sumpaa daaa
      </p>
    ),
    image: ["/memories/1mar.jpg","/memories/1mar1.jpg"]
  },
  {
    title: "5 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        yaapp kita ini di lapangan rektorat pas banget sebelum rapat sumpaa inii lucu banget AOWKWKWKWKWKW and the picture feels alive, mana itu kenapa jadi senyum roblox dah. terus malamnya habis rapat kita makan di mcd dan ada yang tepar ges katanya ga ngantuk tiba tiba ketiduran di cak abit
      </p>
    ),
    image: ["/memories/5mar.jpg","/memories/5mar1.jpg","/memories/5mar2.jpg","/memories/5mar3.jpg","/memories/5mar4.jpg","/memories/5mar5.jpg","/memories/6mar.jpg","/memories/6mar1.jpg"]
  },
  {
    title: "9 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        gacorrrr bendum kesayangan akuu, ternyata tidak sia sia kita mengumpulkan quest lpj an itu, akhirnya makan AYCE busett daaaa. TERUSSS KITA FIRST TIME PHOTOBOX DI KAYUTANGAN HIHIHIHIHIHI LUCU LUCU LUCU LUCU LUCU LUCU LUCU, awkward banget yaallah sumpa aku first time juga photobox as a couple sama kamuuu, SENENGGGG. lucu ga ada foto kita berdua di depan toko roti itu MWEHEHEHEHEH lucu ga lucu ga lucu ga
      </p>
    ),
    image: ["/memories/9mar.jpg","/memories/9mar1.jpg","/memories/9mar2.jpg","/memories/9mar3.jpg","/memories/9mar4.jpg","/memories/9mar5.jpg", "/memories/9mar6.jpg", "/memories/9mar7.jpg", "/memories/9mar8.jpg", "/memories/9mar9.jpg", "/memories/9mar10.jpg", "/memories/9mar11.jpg"]
  },
  {
    title: "13 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kamu habis have a bad day dan bad mood seharian, padahal kamu mau ke kampus, tapi hujan deres mana kamu gaada makan samsek lagi, dan malah makan mie anjer di juwita tapi gapapa untung sayang. terus aku jemput kamu dee pake payung supaya tidak telattt kelas
      </p>
    ),
    image: ["/memories/13mar.jpg","/memories/13mar1.jpg"]
  },
  {
    title: "17 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        pertama kali event BCA wow, ga ekspek bakal foto sama bapaknya, aduh lupa lagi nama beliau pokoknya aku ingetnya beliau direktur bca terus pindah haluan dari fisika ke finance damnnn kita orang terakhir yang dapet foto beliau berdua, mana mau lagi bapaknya gaya i love youu.
      </p>
    ),
    image: ["/memories/17mar.jpg","/memories/17mar1.jpg","/memories/17mar2.jpg","/memories/17mar3.jpg","/memories/17mar4.jpg","/memories/17mar5.jpg","/memories/17mar6.jpg","/memories/17mar7.jpg","/memories/17mar8.jpg","/memories/17mar9.jpg"]
  },
  {
    title: "20 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini pas kita jaga praktikum barenggg, buset da banyak banget aibku disini kacau, aku aib dan kamu pretty tidak adil huuuuu
      </p>
    ),
    image: ["/memories/20mar.jpg","/memories/20mar1.jpg","/memories/20mar2.jpg","/memories/20mar3.jpg","/memories/20mar4.jpg","/memories/20mar5.jpg","/memories/20mar6.jpg","/memories/20mar7.jpg","/memories/20mar8.jpg","/memories/20mar9.jpg"]
  },
  {
    title: "22 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        kita jalan jalan ke grameedddd kayutangan and you tiba tiba take a picture of me, sampe kubikin pp ig second, hihihihi makasii yaaaa ini kita nyobain gramednya baru dan naik lift
        dan ada apa ya
      </p>
    ),
    image: ["/memories/22mar.jpg","/memories/22mar1.jpg"]
  },
  {
    title: "23 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        sumpa disini kita full jalan-jalan karena sudah deket UTBK ingett tidakk ini dimanaaa, yap benar ini di citraland. dan untungnya kita kesini pas ada event jadi rame deee terus bisa beli makan banyakkk dimsum terus ayam terus momoyo. eh itu gambar yang dibawah creepy dah buset, aku weird feelings bahkan ngebayanginnya. mana kita dimarahin satpam lagi disini karena dah malem, sumpaaa takut banget aku disini WOSKSKSKS takut tiba tiba ada yang bawa parang. terus kita malemnya makan di cak abit as always
      </p>
    ),
    image: ["/memories/23mar.jpg","/memories/23mar1.jpg","/memories/23mar2.jpg","/memories/23mar3.jpg","/memories/23mar4.jpg","/memories/23mar5.jpg"]
  },
  {
    title: "24 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        yeeyyy explore makanan baru lagiii, dan this time is yoshinoyaa, orang mana coy belum pernah makan yoshinoya astagaa
      </p>
    ),
    image: ["/memories/24mar.jpg","/memories/24mar1.jpg"]
  },
  {
    title: "25 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        KITA JALAN-JALAN MULU DAH AHAHHAHHHA. ini kita ke plaza diengggg, pas itu rencananya mau makan sushi bareng karena aku gapernah terus kamu ajakin ayok sushi. HUHUHUHUUHU SUSHINYA NANTIAN, KAMUNYA YANG KUMAKAN AH DISINI, YOU LOOK SO FUCKIN BEAUTFIULLL OMAIGADDDDDDD, MY GODDESS, MY ALEXANDRA, MY PRETTIEST, MY SWEETIES, MY EVERYTHING, you never look bad in anything you wear sumpa, heran. kamu kenapa cantik banget si. and surprisingly aku suka sushi, dan kamu. tapi tapi tapi kita malemnya ini berantem....
      </p>
    ),
    image: ["/memories/25mar.jpg","/memories/25mar1.jpg","/memories/25mar2.jpg","/memories/25mar3.jpg","/memories/25mar4.jpg","/memories/25mar5.jpg","/memories/25mar6.jpg","/memories/25mar7.jpg", "/memories/25mar8.jpg","/memories/25mar9.jpg","/memories/25mar10.jpg","/memories/25mar11.jpg","/memories/25mar12.jpg","/memories/25mar13.jpg"]
  },
  {
    title: "27 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini after berantem hiks, kita akhirnya ketemu lagi dan sudah ditahap putus putusan, terus kita akhirnya jalan-jalan ke taman merjosari. tidakkkk adaaa cat attack
      </p>
    ),
    image: ["/memories/27mar.jpg","/memories/27mar1.jpg","/memories/27mar2.jpg","/memories/27mar3.jpg"]
  },
  {
    title: "31 Maret 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        hiksss, ini berantem lagi.... and then aku kesepian dan miss u, terus aku ke mcd malem malem sendirian and pesen milo dan makan mcd just to feel u beside me. besoknya ini lebaran....  
        ttapi tapi sorenya akhirnya baikan.... dan kita benerin puas puasin lama ga ketemu karena kamu ga di malang kemarin kemarinnya. kita jalan-jalan ke mog and trying many lot of clothes terus akhirnya ke kayutangan de malem malem and i took a verrryyyyy beautiful photo of you, mi amorrrrrr oliveeeeee, nda pernah salah kalo liat kamu ini, as always, pretty. hihiihii
      </p>
    ),
    image: ["/memories/31mar.jpg","/memories/31mar1.jpg","/memories/31mar2.jpg","/memories/31mar3.jpg","/memories/31mar4.jpg","/memories/31mar5.jpg","/memories/31mar6.jpg","/memories/31mar7.jpg","/memories/31mar8.jpg","/memories/31mar9.jpg","/memories/31mar10.jpg","/memories/31mar11.jpg","/memories/31mar12.jpg","/memories/31mar13.jpg","/memories/31mar14.jpg","/memories/31mar15.jpg"]
  },
  {
    title: "2 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        omaigaddd kita nyobain kursi pijattt!!!1 aku gapernah nyobain samsek astagaa untungnya sama kamu kalo ga aku gabakalan pernah nyobain seumur hidup, dan dan dan kita took a very cute picture tooo. jirrr malemnya jalan jalan lagi dan ada yang ngide gess pake stocking dan skirt jalan jalan astagaa, habis itu mana dicatcalling beneran lagi. dan kita cara ampuhnya dikasih tau kamu adalah dengan nge vlog mampus tuuu yang catcall
      </p>
    ),
    image: ["/memories/2apr.jpg","/memories/2apr2.jpg","/memories/2apr3.jpg","/memories/2apr4.jpg","/memories/2apr5.jpg","/memories/2apr6.jpg"]
  },
  {
    title: "4 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        jirrr belajar ppic karena deket ulangan, and then kita jalan-jalan karena capek belajar malashhh ini kita akhirnya ke matos deh ke apaaa yaa ini kok lupa namanya, ohhh oh some, itu pitanya lucu banget deh kaya bocil. kalo punya anak kayanya lucu deh kalo pake pita ke sekolah kan. ituuu ada mikooooooooooooo
      </p>
    ),
    image: ["/memories/4apr.jpg","/memories/4apr1.jpg","/memories/4apr2.jpg","/memories/4apr3.jpg"]
  },
  {
    title: "10 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini yang jelas kita di sego resek tapi itu ngapain yak kepang kepang rambut randomnyaaa, terus i got kisss hehehehehe
      </p>
    ),
    image: ["/memories/10apr.jpg","/memories/10apr1.jpg"]
  },
  {
    title: "13 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini kita jalan-jalan dann padahal itu dalam posisi kita lagi berantem and then i cant get a sleep because all i do is missing u
      </p>
    ),
    image: ["/memories/13apr.jpg","/memories/13apr1.jpg","/memories/13apr3.jpg"]
  },
  {
    title: "14 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        besoknya akhirnya kita ketemu..... seneng.... kita jlan-jalan ke ub dieng lagi... padahal kita disini udah putus.....
      </p>
    ),
    image: ["/memories/14apr.jpg","/memories/14apr1.jpg"]
  },
  {
    title: "18 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        AHAHAHAHAHHAAH KITA PHOTOBOX LAGI YEEEYYYYYYYY, omaigad my girl in black, you such a baddie.... hihihi aku ada di kiss. terus kita disitu lagi makan nasi goreng dan aku buy you a flowerss diam diam AHAHAHHAHHAH, EXPECT TIDAKKK. astaga. fotonya bikin kangen banget. i miss u hiks. i miss jalan jalan sama kamu. i miss spend time with u. i miss everything about u. my olive.
      </p>
    ),
    image: ["/memories/18apr.jpg","/memories/18apr1.jpg","/memories/18apr2.jpg","/memories/18apr3.jpg","/memories/18apr4.jpg","/memories/18apr5.jpg","/memories/18apr6.jpg","/memories/18apr7.jpg","/memories/18apr8.jpg","/memories/18apr9.jpg","/memories/18apr10.jpg","/memories/18apr11.jpg","/memories/18apr12.jpg","/memories/18apr13.jpg","/memories/18apr14.jpg","/memories/18apr15.jpg","/memories/18apr16.jpg"]
  },
  {
    title: "21 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ebuset dah ini kalo gasalah kita habis makan ramen terus ada orang jualan stroberi di depannya, nah baru sorenya kepikiran apa ke mcd ya beli eskrim kayanya enak kalo dicampur eskrim ahahahahhahaha
      </p>
    ),
    image: ["/memories/21apr.jpg","/memories/21apr1.jpg"]
  },
  {
    title: "22 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ada yang beli hp baru ges padahal kemarin rusaknya eh besoknya langsung beli hp. selamat hp baruuu. tapii malemnya kita berantem and you should remember it...... hikss
      </p>
    ),
    image: ["/memories/22apr.jpg",]
  },
  {
    title: "23 April 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini malemnya aku cuman kepikiran kamu, terus besok malemnya pun kita masih berantem dan akhirnya ketemuan di mcd buat bicara baik baik. iloveu
      </p>
    ),
    image: ["/memories/23apr.jpg","/memories/23apr1.jpg"]
  },
  {
    title: "3 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        HOHOHOHO bca akhirnya ada kegiatan TP, mana ini lagi yang jadi cover di HMTI itu lagi astagaa
      </p>
    ),
    image: ["/memories/3may.jpg","/memories/3may1.jpg"]
  },
  {
    title: "12 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        seronoknyaa gangguu tuuuu, omaigattt you look so different when you use necklace, you looks like my mommy WKWKWKWKWKW btw ini kita dimanaa hayooo yap di k3 mart. full dah gallery ku sama kamu tapi gapapa heheh suka. terus terus kita took a very very cute pictureeeeeee togetherr all time my favorite
      </p>
    ),
    image: ["/memories/12may.jpg","/memories/12may1.jpg","/memories/12may2.jpg","/memories/12may3.jpg", "/memories/12mei.jpg" ]
  },
  {
    title: "13 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ada yang dapet bungaaaa gaisss GODDDD YOU LOOOKS SO PRETTTYYYYYYYY, mau nikah langsung aja gaaaa, kamu punya aku aja seorang.
      </p>
    ),
    image: ["/memories/13may.jpg","/memories/13may1.jpg","/memories/13may2.jpg","/memories/13may3.jpg"]
  },
  {
    title: "14 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        yaappp kita first time sarapan bareng nasi kuning astagaaaa WWKWKKWWK se anti morning person ituu
      </p>
    ),
    image: ["/memories/14may.jpg"]
  },
  {
    title: "21 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        pas dari kemarin kemarin kamu selalu bilang mau ganti sepatu dee soalnya solnya lepas, dan ini kita jalan jalan ke matos dee for find your shoes akhirnya ketemu di matahari sebelum tutup banget itu matosnyaaa HAHAAHAHAH terus malemnya gatau kenapa ke UB terus nyopot logo ub 
      </p>
    ),
    image: ["/memories/21may.jpg","/memories/21may1.jpg","/memories/22may.jpg","/memories/22may1.jpg"]
  },
  {
    title: "26 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        kita putus. kesekian kalinya. and this is your breakup flowers. liv. i miss u so much. i still love you even until this day. aku inget banget kamu tiba tiba clingy di burgerking, your voice become my olive voice terus nanyain kapan berobat buat matanya, ayo aku temenin, omaigatt masih inget aku
      </p>
    ),
    image: ["/memories/26may.jpg","/memories/26may1.jpg","/memories/26may2.jpg","/memories/26may3.jpg","/memories/26may4.jpg","/memories/26may5.jpg","/memories/26may6.jpg","/memories/26may7.jpg"]
  },
  {
    title: "28 Mei 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        hihihihihiii siapa dapet flowers lagi yaaaa, you looook cute terus si heran, gapernah de ga cute, ituu malemnya kita makan mcd dan my first time setelah terakhir kali pas bocil
      </p>
    ),
    image: ["/memories/28may.jpg","/memories/28may1.jpg","/memories/28may2.jpg","/memories/28may3.jpg"]
  },
  {
    title: "3 Juni 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        ini jalan-jaln terakhir sebelum.... putus...
      </p>
    ),
    image: ["/memories/3june.jpg"]
  },
  {
    title: "7 Juni 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        we still met the day after it, dan disini kita ke taman ijen. terus ketemu GOLDEN RETRIEVER KAMU IMGET GAAA MANA DIA BESAR BANGET. aduh aku mana gaada fotonya lagi
      </p>
    ),
    image: ["/memories/7june.jpg"]
  },
  {
    title: "10 Juni 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        kita makannn ramennn disiniii, marugame udon. and yeah we still met eachoter
      </p>
    ),
    image: ["/memories/10june.jpg"]
  },
  {
    title: "26 Juni 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        hihihihii habis makan ramen sama kamu jugaaa dan i try my new sweater. and you said it looks fit on u aku keliatan gentle heheheh
      </p>
    ),
    image: ["/memories/26june.jpg","/memories/26june.jpg","/memories/26june.jpg","/memories/26june.jpg"]
  },
  {
    title: "6 Juli 2025",
    content: (
      <p className="text-neutral-700 dark:text-neutral-300">
        our last photobox. i love you more, liv.
      </p>
    ),
    image: ["/memories/6jul.jpg","/memories/6jul1.jpg","/memories/6jul2.jpg","/memories/6jul3.jpg","/memories/6jul4.jpg","/memories/6jul4.jpg"]
  },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };



  return (
    <PinGuard> <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-10 gap-10">
      <SmoothCursor />
      {/* Header Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8">
        {/* Gambar kiri - tengah di mobile */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <PixelImage src="/memories/2.jpg" grid="8x8"/>
        </div>

        {/* Teks kanan - posisi vertikal diperbaiki */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:mt-8">
          <ShinyText 
            speedInMs={5000} 
            className="text-4xl md:text-5xl font-bold break-words leading-tight w-full !from-pink-300 !via-pink-500 !to-pink-300 dark:!from-pink-300 dark:!via-pink-100 dark:!to-pink-300"
          >
            HALOOOOWWWW THIS IS our SWEET MEMORIES
          </ShinyText>

          {/* Super Cute Music Player */}
          <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
            {/* Cute Play Button */}
            <div className="relative">
              <button
                onClick={togglePlay}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 hover:from-pink-400 hover:via-pink-500 hover:to-pink-600 rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-110 group overflow-hidden"
                style={{
                  boxShadow: isPlaying 
                    ? '0 0 30px rgba(244, 114, 182, 0.6), 0 0 60px rgba(244, 114, 182, 0.3)' 
                    : '0 8px 25px rgba(244, 114, 182, 0.4)'
                }}
              >
                {/* Cute sparkle effects */}
                <div className="absolute inset-0 rounded-full opacity-30">
                  <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-3 left-2 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
                </div>
                
                {/* Heart border animation when playing */}
                {isPlaying && (
                  <div className="absolute -inset-2 rounded-full border-2 border-pink-300 animate-pulse opacity-60"></div>
                )}
                
                {/* Play/Pause Icon */}
                <div className="relative z-10">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white ml-0 drop-shadow-lg" fill="white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1 drop-shadow-lg" fill="white" />  
                  )}
                </div>
                
                {/* Cute bounce effect */}
                <div className={`absolute inset-0 rounded-full bg-white opacity-20 transform transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}></div>
              </button>
              
              {/* Floating hearts when playing */}
              {isPlaying && (
                <>
                  <Heart className="absolute -top-2 -right-1 w-4 h-4 text-pink-400 animate-bounce delay-100" fill="currentColor" />
                  <Heart className="absolute -bottom-1 -left-2 w-3 h-3 text-pink-300 animate-bounce delay-500" fill="currentColor" />
                </>
              )}
            </div>
            
            {/* Song Info with cute styling */}
            <div className="flex flex-col relative">
              <div className="flex items-center gap-2 mb-1">
                <Music className="w-4 h-4 text-pink-400 animate-pulse" />
                <span 
                  className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide"
                  style={{ 
                    fontFamily: '"Caveat", cursive',
                    textShadow: '2px 2px 4px rgba(244, 114, 182, 0.3)'
                  }}
                >
                  love.
                </span>
              </div>
              <span 
                className="text-sm text-gray-600 dark:text-gray-400 ml-6"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                by wave to earth
              </span>
              
              {/* Cute wave animation when playing */}
              {isPlaying && (
                <div className="flex gap-1 ml-6 mt-1">
                  <div className="w-1 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 bg-pink-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-1 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-1 h-4 bg-pink-400 rounded-full animate-pulse delay-450"></div>
                  <div className="w-1 h-2 bg-pink-400 rounded-full animate-pulse delay-600"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            loop
          >
            <source src="/music/love.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>

      {/* Timeline */}
      <Timeline data={timelineData} />

      <div className="relative h-[500px] w-full overflow-hidden">
        <VideoText src="/video/video.webm" fontSize={5}>
          L O V E
        </VideoText>
      </div>  
    </main>
  ); </PinGuard>)
}