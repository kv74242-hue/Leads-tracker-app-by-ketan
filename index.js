import { initializeApp } from "firebase/app"
import { forceWebSockets, getDatabase,ref,push,onValue,remove} from "firebase/database"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-3e839-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
forceWebSockets()
const database = getDatabase(app)
const reference = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(reference, function(snapshot){
    const snapshotDoesExists = snapshot.exists()
    if(snapshotDoesExists){
    const snapshotValues = snapshot.val()
    const Leads = Object.values(snapshotValues)
    render(Leads)
    }
})
deleteBtn.addEventListener("dblclick", function() {
  remove(reference)
  ulEl.innerHTML = " "
})

inputBtn.addEventListener("click", function() {
  push(reference,inputEl.value)
   inputEl.value = ""
})