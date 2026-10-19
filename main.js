
const konyvek = []

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
    new Konyv("Ways of the Devil", "Trixie Wee", 1939, 250)
)



const target = document.getElementById("target-tbody")
loadTable()


const ujKonyvInputok = document.getElementsByClassName("uj-konyv-inputok")










function loadTable() {
    target.innerHTML = ""
    for (let i = 0; i < konyvek.length; i++) {

        const template = document.getElementById("table-template")
        const row = template.content.cloneNode(true)
        const fields = row.getElementById("template-tr").getElementsByClassName("table-fields")
        fields[0].textContent = konyvek[i].cim
        fields[1].textContent = konyvek[i].szerzo
        fields[2].textContent = konyvek[i].kiadasiev
        fields[3].textContent = konyvek[i].oldalszam
        fields[4].textContent = konyvek[i].kolcsonozve ? "Kölcsönozve" : "Nincs kölcsönozve"

        const button = document.createElement("button")
        button.textContent = konyvek[i].kolcsonozve ? "Visszavitel" : "Kölcsönzés"
        button.addEventListener("click", () => {
            if (konyvek[i].kolcsonozve) {
                konyvek[i].visszahoz()
            }
            else {
                konyvek[i].kolcsonoz()

            }
            console.log(konyvek[i].kolcsonozve, konyvek[i].kolcsonoz)
            loadTable();
        })

        fields[5].appendChild(button)
        target.appendChild(row)



    }

}









