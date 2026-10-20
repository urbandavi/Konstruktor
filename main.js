
const konyvek = []
let szabadkonyvek = false


const target = document.getElementById("target-tbody")
const template = document.getElementById("table-template")
const ujKonyvInputok = document.getElementsByClassName("uj-konyv-inputok")
const cimInp = document.getElementById("cim")
const szerzoInp = document.getElementById("szerzo")
const evInp = document.getElementById("kiadasi-ev")
const oldalszamInp = document.getElementById("oldalszam")
const felvetelBtn = document.getElementById("felvetel")
const szbdKonyvek = document.getElementById("szbd-konyvek")
const regiKonyv = document.getElementById("legr-konyv")
const legvasKönyv = document.getElementById("legv-konyv")
const oldalAtlag = document.getElementById("oldalszam-atlag")


function Konyv(cim, szerzo, kiadasiev, oldalszam) {
    this.cim = cim
    this.szerzo = szerzo
    this.kiadasiev = kiadasiev
    this.oldalszam = oldalszam
    this.kolcsonozve = false
    this.kolcsonoz = function () {
        this.kolcsonozve = true
    }
    this.visszahoz = function () {
        this.kolcsonozve = false
    }
}

konyvek.push(
    new Konyv("The Times Desire", "Hyden Cloud", 1871, 200),
    new Konyv("Twinkle Star", "Matthew Rain", 1919, 70),
    new Konyv("Ways of the Devil", "Trixie Wee", 1939, 250),
    new Konyv("Spouces", "Spark", 1941, 400)
)


felvetelBtn.addEventListener(
    "click", () => {
        registerBook()
        loadTableCompact()
    }
)
szbdKonyvek.addEventListener(
    "click", () => {
        szabadkonyvek = !szabadkonyvek
        loadTableCompact()
        console.log(szabadkonyvek)
    }
)

document.addEventListener("DOMContentLoaded", ()=>{
    
    loadTableCompact()
    writeStatistics(getStatistics())
}
)




function registerBook() {
    konyvek.push(new Konyv(
        cimInp.value, szerzoInp.value, Number(evInp.value), Number(oldalszamInp.value)
    ))
    writeStatistics(getStatistics())

}


function getStatistics() {
    let jelenKiadasiEv = 0;
    let jelenOldalszam = 0;
    let osszOldalszam
    konyvek.forEach(item => {
        if (item.oldalszam > jelenOldalszam) {
            jelenOldalszam = item.oldalszam
        }
        if (item.kiadasiev > jelenKiadasiEv) {
            jelenKiadasiEv = item.kiadasiev
        }
        osszOldalszam += item.oldalszam
    });
    let oldalatlag = osszOldalszam / konyvek.length
    return { jelenKiadasiEv, jelenOldalszam, oldalatlag }
}


function writeStatistics(stats) {
    regiKonyv.innerHTML = `A legrégebbi könyv ${stats.jelenKiadasiEv}\n`
    legvasKönyv.innerHTML = `A legvastagabb könyve ${stats.jelenOldalszam}\n`
    oldalAtlag.innerHTML = `Az osszes oldal átlaga ${stats.oldalatlag}\n`

}



function loadTableCompact() {
    target.innerHTML = ""
    for (let index = 0; index < konyvek.length; index++) {
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")

        if (szabadkonyvek) {
            if (!konyvek[index].kolcsonozve) {
                comapcLoad(konyvek[index], fields)
            }
            else {
                continue;
            }
        }
        else {
            comapcLoad(konyvek[index], fields)
        }

        target.appendChild(row)
    }

}

function comapcLoad(konyv, fields) {
    fields[0].textContent = konyv.cim
    fields[1].textContent = konyv.szerzo
    fields[2].textContent = konyv.kiadasiev
    fields[3].textContent = konyv.oldalszam
    fields[4].textContent = konyv.kolcsonozve ? "Kölcsönozve" : "Nincs kölcsönozve"

    const button = document.createElement("button")
    button.textContent = konyv.kolcsonozve ? "Visszavitel" : "Kölcsönzés"
    button.addEventListener("click", () => {
        if (konyv.kolcsonozve) {
            konyv.visszahoz()
        }
        else {
            konyv.kolcsonoz()

        }
        console.log(konyv.kolcsonozve, konyv.kolcsonoz)
        loadTableCompact()
    })

    fields[5].appendChild(button)
    return fields
}











