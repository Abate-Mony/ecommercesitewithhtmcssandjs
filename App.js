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
    if (diff > 1 && abs(diff) > seperate) return openData()
    if (abs(diff) > seperate) {
        position_x = 0
        isMousedown = false
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
    isMousedown = false
    position_x = 0

}
const mousedown = e => {
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