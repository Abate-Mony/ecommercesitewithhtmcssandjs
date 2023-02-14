const triggerOpen = qA("[trigger-button]")
const triggerClose = qA("[close-button]")
const overlay = qS("[data-overlay]")
let currentId = null
var targetElm = null
var isMousedown = false
let position_x = 0
const seperate = 150
const openData = function() {
    if (!targetElm) return
    targetElm.classList.remove('active')
    overlay.classList.remove('active')
}

triggerOpen.forEach((triggerBtn) => {
    triggerBtn.addEventListener("click", () => {
        currentId = triggerBtn.dataset.target
        targetElm = qS(`#${currentId}`)
        targetElm.classList.add("active")
        overlay.classList.add("active")
        targetElm.querySelector("[close-button]").onclick = () => openData()
        overlay.onclick = () => openData()
    })
})

// code to open menu on slide 
const { abs } = Math
const mousemove = e => {
    e.stopPropagation()
    const isSlider = e.target.closest(".sliderbox")

    if (!isMousedown) return
    if (position_x <= 50) return

    var diff = null
    var move = null
    const { type } = e
    if (e.type == "mousemove") {
        move = e.clientX
    } else {
        move = e.touches[0].clientX
    }
    diff = position_x - move
    if (diff > 1 && abs(diff) > seperate) {

        if (isSlider) return changeSlides(-1)
        openData()

        return
    }
    return
    if (abs(diff) > seperate) {
        position_x = 0

        isMousedown = false
            // changeSlides(1)
        if (isSlider) return changeSlides(1)


        if (targetElm !== qS(`#mobile-menu`)) {
            openData()
        }
        targetElm = qS(`#mobile-menu`)
        targetElm.classList.add("active")
        overlay.classList.add("active")
        targetElm.querySelector("[close-button]").onclick = () => openData()

    }
}
const mouseup = e => {
    e.stopPropagation()

    isMousedown = false
    position_x = 0

}
const mousedown = e => {
    e.stopPropagation()
    isMousedown = true
    const { type } = e
    if (type == "mousedown") {
        position_x = e.clientX
    } else {
        position_x = e.touches[0].clientX
    }
}
window.addEventListener("mousedown", mousedown)
window.addEventListener("mouseup", mouseup)
window.addEventListener("mousemove", mousemove)


// for touches devices 
window.addEventListener("touchstart", mousedown)
window.addEventListener("touchend", mouseup)
window.addEventListener("touchmove", mousemove)






const subMenu = qA(".child-trigger")
subMenu && subMenu.forEach((menu) => {
    menu.addEventListener("click", function(e) {
        e.preventDefault()
        e.stopPropagation()
        if (this.closest(".has-child").classList.contains("active")) return this.closest(".has-child").classList.remove("active")
        subMenu.forEach(item => item != this ? item.closest(".has-child").classList.remove("active") : this.closest(".has-child").classList.add("active"))
    })
})


const slides = [...qA(".slider .sliderbox .wrap>.item")]
const scrollelm = qS(".slider .sliderbox .wrap")
    // slides.forEach((slide, index) => slide.style.left = `${index*100}%`)
var counter = 0
const check = () => {
    if (counter >= slides.length) {
        counter = 0
        return
    }
    if (counter < 0) counter = slides.length - 1
}
slides.forEach((_, index) => {
    const button = document.createElement("button")
    button.classList.add("navigate-button")
    if (!index) button.classList.add("active")
    qS(".navigate__buttons-container").appendChild(button)
})

const buttons = [...qA(".navigate-button")]

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        counter = index + 1
        if (btn.classList.contains("active")) return
        changeSlides(1)
    })
})

function changeSlides(n) {
    slides.forEach((_, index) => {
        slides[index].classList.remove("active")
        buttons[index].classList.remove("active")
    })
    if (n > 0) {
        --counter
        check()

        slides[counter].classList.add("active")
        buttons[counter].classList.add("active")
    } else {
        ++counter
        check()

        slides[counter].classList.add("active")
        buttons[counter].classList.add("active")
    }

}
changeSlides(-1)

scrollelm.addEventListener("mousedown", mousedown)
scrollelm.addEventListener("mouseup", mouseup)
scrollelm.addEventListener("mousemove", mousemove)


// for touches devices 
scrollelm.addEventListener("touchstart", mousedown)
scrollelm.addEventListener("touchend", mouseup)
scrollelm.addEventListener("touchmove", mousemove)

setInterval(() => {
    changeSlides(1)
}, 2000)




// scroll animation here 
var new_scroll = 0
var old_scroll = 0
const header = document.querySelector("header")
const { height: heightOfHeader } = header.getBoundingClientRect()
document.addEventListener("scroll", () => {
    const { pageYOffset } = window
    new_scroll = pageYOffset
    if (pageYOffset > heightOfHeader) {
        if (new_scroll >= old_scroll) {
            header.classList.add("slideup")
        } else if (new_scroll < old_scroll) {
            header.classList.remove("slideup")
        }

        old_scroll = new_scroll <= 0 ? 0 : new_scroll
        sorter.querySelector("ul").classList.remove("show")
    }
})



const sorter = qS(".sort-list")
if (sorter) {
    const sortLi = [...sorter.querySelectorAll("li")];
    const sortData = [...
        qA(".sort-data")
    ]
    const optTrigger = sorter.querySelector(".opt-trigger")
    optTrigger.onclick = () => sorter.querySelector("ul").classList.toggle("show")
    sortLi.forEach((li, index) => {
        li.onclick = function() {
            const timer = setTimeout(() => {
                clearInterval(timer)
                sorter.querySelector("ul").classList.remove("show")

            }, 250);

            const { id: dataTarget } = this.dataset
            const tabbed = qS(".bycats")
            const body = tabbed.querySelector(`#${dataTarget}`)
            sortData.forEach((_, i) => i != index && _.classList.remove("active"))
            body.classList.add("active");

            sortLi.forEach(item => item !== this && item.classList.remove("active")) //removes the item that does not match the click button 
            if (this.classList.contains("active")) return //remove the class and return back without checking the rest of the code 
            this.classList.add("active") //add the classt to this the element that initiatedt the class
            const text = this.textContent //get the text inside the container 
            const value = optTrigger.querySelector("span.value") //get the location memroy and store in value
            if (value) { //check if the value exits
                value.textContent = text //asign to text
            }

        }
    })
}

// tab index

// const trigger = [...qA(".tabbed-trigger")]
// const content = [...qA(".tabbed >div")]