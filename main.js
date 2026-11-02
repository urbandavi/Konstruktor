
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
    new Konyv("Spider", "Shovel", 1871, 200),
    new Konyv("Bugs", "Shovel", 1919, 70),
    new Konyv("Bamboo", "Shovel", 1939, 250),
    new Konyv("Spouces", "Shovel", 1941, 400)
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

document.addEventListener("DOMContentLoaded", () => {

    loadTableCompact()
    writeStatistics(getStatistics())
}
)




function registerBook() {
    try {
        if (cimInp.value === "" || szerzoInp.value === "" || evInp.value === "" || oldalszamInp.value === "") {
            throw new Error("Hiányzik az egyik elvárt adat!")
        }
        konyvek.push(new Konyv(
            cimInp.value, szerzoInp.value, Number(evInp.value), Number(oldalszamInp.value)
        ))
        writeStatistics(getStatistics())
        cimInp.value = ""
        szerzoInp.value = ""
        evInp.value = ""
        oldalszamInp.value = ""

    } catch (error) {
        alert(error)
    }

}


function getStatistics() {
    let jelenOldalszam = 0;
    let osszOldalszam = 0;
    let konyvStatisztika = konyvek

    konyvek.forEach(item => {
        if (item.oldalszam > jelenOldalszam) {
            jelenOldalszam = item.oldalszam
        }
        osszOldalszam += item.oldalszam
    });
    konyvStatisztika.sort((a, b) => a.kiadasiev - b.kiadasiev);

    let oldalatlag = Math.round(osszOldalszam / konyvek.length)
    let legKorabbi = konyvStatisztika[0].kiadasiev;

    return { legKorabbi, jelenOldalszam, oldalatlag }
}


function writeStatistics(stats) {
    regiKonyv.innerHTML = `A legrégebbi könyv ${stats.legKorabbi}\n`
    legvasKönyv.innerHTML = `A legvastagabb könyv ${stats.jelenOldalszam}\n`
    oldalAtlag.innerHTML = `Az osszes oldal átlaga ${stats.oldalatlag}\n`

}



function loadTableCompact() {
    target.innerHTML = ""
    for (let index = 0; index < konyvek.length; index++) {
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")

        if (szabadkonyvek) {
            if (!konyvek[index].kolcsonozve) {
                comapcLoad(konyvek[index], fields, index)
            }
            else {
                continue;
            }
        }
        else {
            comapcLoad(konyvek[index], fields, index)
        }

        target.appendChild(row)
    }

}

function comapcLoad(konyv, fields, index) {
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
    const torles = document.createElement("button")
    torles.textContent = "Törlés"
    torles.addEventListener("click", () => {
        konyvek.splice(index, 1)
        loadTableCompact()
        writeStatistics(getStatistics())
    })


    fields[5].appendChild(button)
    fields[6].appendChild(torles)
    return fields
}