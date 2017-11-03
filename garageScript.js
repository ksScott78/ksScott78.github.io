//TODO
// - create car with array of faults
// - create car with no faults using checks when wanting to print or use faults array.
// - cost with faults
// - all CSS
// - push to git repo with other exercises
// - update website and link the git pages to include this exercise.

let garage = [];
let faultCount = 0;

//Get variables to create car.
//Pass arguments to make and return the car object.
//Use this to add car to garage.
function getCarToAdd() {
    let reg = document.getElementById("carReg").value;
    let make = document.getElementById("carMake").value;
    let year = document.getElementById("yearMade").value;
    let engSize = document.getElementById("engineSize").value;
    let listOfFaults = [];
    for (let i = 1; i <= faultCount; i++) {
        let f = document.getElementById("faults" + i).value;
        listOfFaults.push(f)
    }
    addCar(makeAndAddCar(reg, make, year, engSize, listOfFaults))
}

//Construct car object and return it to add to garage.
function makeAndAddCar(reg, make, year, engSize, listOfFaults) {
    let car = {};
    car.reg = reg;
    car.make = make;
    car.year = year;
    car.engSize = engSize;
    car.listOfFaults = listOfFaults;
    return car;
}

//Emptys inputs after adding a car.
function clearInputs() {
    document.getElementById("carReg").value = "";
    document.getElementById("carMake").value = "";
    document.getElementById("yearMade").value = "";
    document.getElementById("engineSize").value = "";
}

function clearCarRemove() {
    document.getElementById("idToRemove").value = "";
}

function addCar(car) {
    clearInputs();
    garage.push(car);

    let carDesc = document.createElement("div");
    carDesc.setAttribute("id", car.reg);
    let node = car.reg;
    let node2 = car.make;
    let node3 = car.year;
    let node4 = car.engSize;

    carDesc.appendChild(document.createTextNode(" " + node));
    carDesc.appendChild(document.createTextNode(" " + node2));
    carDesc.appendChild(document.createTextNode(" " + node3));
    carDesc.appendChild(document.createTextNode(" " + node4));
    //DONT CHANGE STOPS ALL OUTPUT 
    if (car.listOfFaults.length >= 0) {
        let node5 = car.listOfFaults;
        for (let i = 0; i < node5.length; i++) {
            let faultNode = node5[i];
            carDesc.appendChild(document.createTextNode(" Fault " + +(i + 1) + " " + faultNode));
        }
        let element = document.getElementById("showCars");
        element.appendChild(carDesc);
    }
}

function clearGarage() {
    for (let i = 0; i < garage.length; i++) {
        let parkedCar = garage[i].reg;
        let carToDelete = document.getElementById(parkedCar);
        carToDelete.parentNode.removeChild(carToDelete);
    }
    garage.length = 0;
}

//Check the Registration entered by user set that as the div id to remove.
//splice to remove the one element we want.
//clear inputs content upon button press.
function removeCar() {
    let carId = document.getElementById("idToRemove").value;
    clearCarRemove();
    let carToDelete = document.getElementById(carId);
    carToDelete.parentNode.removeChild(carToDelete);
    for (let i = 0; i < garage.length; i++) {
        if (carId === garage[i].reg) {
            garage.splice(i, 1);
        }
    }
}

//Removes the last fault added, leaves gap and unsure if works as intended.
function removeFault() {
    let lastFault = document.getElementById("faults" + faultCount);
    lastFault.parentNode.removeChild(lastFault);
    faultCount--;
}


//Add a new fault text box to enter a fault name
//Append to faults div in HTML file
function addFault() {
    faultCount++;
    let fault = document.createElement("div")
    fault.innerHTML += "<input type='text' placeholder='input lights,brakes or tyres' id='faults" + faultCount + "'><br >";

    let carInput = document.getElementById("faults");
    carInput.appendChild(fault);
}

function findCost() {
    let baseCost = 200;
    let faultCost = 0;
    let carId = document.getElementById("carToCost").value;
    clearCarCostRemove();
    let carToCost = document.getElementById(carId);
    for (let key in garage) {
        let car = garage[key];
        if (carId === car.reg) {
            if (car.listOfFaults.length >= 0) {
                for (let i = 0; i < car.listOfFaults.length; i++) {
                    let faultWord = car.listOfFaults[i];
                    faultCost += costFaults(faultWord);
                }
            }
            let finalCost = (faultCost + baseCost + costEngine(car.engSize) + costYear(car.year));
            window.alert("Cost to repair: \u00A3" + finalCost);
        }
    }
}


function costEngine(engSize) {
    let eng = engSize;
    if (eng <= 1) {
        return 100;
    }
    else if (eng > 1 && eng <= 3) {
        return 250;
    }
    else if (eng > 3) {
        return 500;
    }
}

function costYear(year) {
    let yearPro = 2017 - year;
    if (yearPro <= 5) {
        return 100;
    }
    else if (yearPro > 5 && yearPro <= 10) {
        return 400;
    }
    else if (yearPro > 10) {
        return 600;
    }
}

function clearCarCostRemove() {
    document.getElementById("carToCost").value = "";
}

function costFaults(faultName) {
    let checkName = faultName.toLowerCase();
    if (checkName === "brakes") {
        return 200;
    }
    else if (checkName === "tyres") {
        return 300;
    }
    else if (checkName === "lights") {
        return 100;
    }
}


