
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
console.log(konyvek.length)

konyvek[0].kolcsonoz
console.log(konyvek[0])

const target = document.getElementById("target-tbody")
loadTable()


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
        fields[4].textContent = konyvek[i].kolcsonozve ? "Kölcsönözhető" : "Nem kölcsönözhető"

        const button = document.createElement("button")
        button.textContent = konyvek[i].kolcsonozve ? "Kölcsönözhető" : "Nem kölcsönözhető"
        button.addEventListener("click", () => {
            if (konyvek[i].kolcsonozve) {
                konyvek[i].visszahoz
            }
            else {

            }
            console.log(konyvek[i].kolcsonozve, konyvek[i].kolcsonoz)
            loadTable();
        })

        fields[5].appendChild(button)
        target.appendChild(row)



    }

}









