const cart = document.querySelector('.cart');

// QUANTITY CONTROLS
const controlsBtn = document.querySelectorAll('.controls-btn');  
const quantityCount = document.querySelector('.quantity-count');
let currVal = Number(quantityCount.textContent)

cart.addEventListener('click', (e) => handleCartClick(e))

function handleCartClick(e){  
    const cartCard = cart.querySelector('.cart-card')
    
    const isOpen = cartCard.getAttribute('aria-expanded');

    if(isOpen === 'true'){
        cartCard.setAttribute('aria-expanded', 'false')
    } else {
        cartCard.setAttribute('aria-expanded', 'true')
    }
}


// IMAGE CAROUSEL 
const overlay = document.querySelector('.image-overlay');
const images = document.querySelectorAll('.more-imgs')
const closeBtn = overlay.querySelector('.close-btn')

const currentHomeImg = document.querySelector('.current-img')

const imgContainer = overlay.querySelector('.image-overlay-container')

images.forEach(image => image.addEventListener('click', (e) => handleImageClick(e)))

function handleImageClick(e) {
    const hidden = overlay.getAttribute('aria-hidden');
    if(hidden === 'true'){
        overlay.setAttribute('aria-hidden', 'false')
    } else {
        overlay.setAttribute('aria-hidden', 'true')
        imgContainer.innerHTML = `${e.target.outerHTML}`
    }
    setActive()
}
closeBtn.addEventListener('click', (e) => handleImageClick(e))


// image slider controls 
// SLIDER KEYS FOR DESKTOP
const sliderBtn = document.querySelectorAll('.slider-btn')

const layoverCarousel = document.querySelectorAll('.slider-images')
const homePageCarousel = document.querySelectorAll('.more-imgs')


sliderBtn.forEach( btn => btn.addEventListener('click', (e) => handleSliderClick(e)))

function handleSliderClick(e){
    const currImgPos = imgContainer.querySelector('img').getAttribute('data-position')
    if(e.target.name === 'next'){
        const nextImgPos = String((Number(currImgPos) % 4) + 1)
        const html = `<img  data-position="${nextImgPos}"  class="slider-images" src="./images/image-product-${nextImgPos}.jpg" alt=""/>`


        imgContainer.innerHTML = html

    } else if(e.target.name === 'prev') {
       const nextImgPos = currImgPos === '1' ? String(4): String(Number(currImgPos) - 1)
       const html = `<img  data-position="${nextImgPos}"  class="slider-images" src="./images/image-product-${nextImgPos}.jpg" alt=""/>`
        
       imgContainer.innerHTML = html
    }
    
}  

// SEPARATE SLIDER KEYS FOR MOBILE DEVICE 
const mobileBtns = document.querySelector('.mobile-btns')
mobileBtns.childNodes.forEach(child => child.addEventListener('click', (e) => handleSliderClickMobile(e)))


function handleSliderClickMobile(e){
    const currentImgContainer = document.querySelector('.current-img-container')
    
    const currPos = currentImgContainer.querySelector('img').getAttribute('data-position')

    if(e.target.name === 'next'){
        const nextImgPos = String((Number(currPos) % 4) + 1)
        const html = `<img  data-position="${nextImgPos}"  class="slider-images" src="./images/image-product-${nextImgPos}.jpg" alt=""/>`
        
        currentImgContainer.innerHTML = html
    } else if(e.target.name === 'prev'){
        const nextImgPos = currPos === '1' ? String(4): String(Number(currPos) - 1)
        const html = `<img  data-position="${nextImgPos}"  class="slider-images" src="./images/image-product-${nextImgPos}.jpg" alt=""/>`
        
        currentImgContainer.innerHTML = html
    }

}


// click interaction with slider images
layoverCarousel.forEach(image => image.addEventListener('click', (e) => {
    imgContainer.innerHTML = `${e.target.outerHTML}`
    setActive()
}))

function setActive(){
    const activeDiv = document.querySelectorAll('.active')
    activeDiv.forEach(div => div.classList.remove('active'))

    const currActiveImgPos = imgContainer.querySelector('img').getAttribute('data-position')

    layoverCarousel.forEach(image => {
        if(currActiveImgPos === image.getAttribute('data-position')){
            image.parentElement.classList.add('active')
        }
    })

    homePageCarousel.forEach(image => {
        if(currActiveImgPos === image.getAttribute('data-position')){
            image.parentElement.classList.add('active')
        }
    })

    currentHomeImg.innerHTML = imgContainer.innerHTML

}


// QUANTITY CONTROLS
controlsBtn.forEach(btn => btn.addEventListener('click',(e) => handleControlClick(e)))

function handleControlClick(e) {
    const type = e.target.dataset.type;
    
    if(type === 'add'){
        quantityCount.textContent = currVal += 1
    } else {
        // Base case when quantityCount is 1
        if(currVal === 1) return

        quantityCount.textContent = currVal -= 1
    }
}


// adding items to cart
const addToCart = document.querySelector('.addtocart-btn');
const cartCount = document.querySelector('.cart-count')

const cartCard = document.querySelector('.card-data')

addToCart.addEventListener('click', () => {
    const html = `
    <div class="details">
        <img class="thumbnail" src="./images/image-product-1-thumbnail.jpg" alt="">
        <div class="details-container">
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x ${currVal} <span class="total-price">$${Number(currVal) * 125}.00</span></p>
        </div>
        <img src="./images/icon-delete.svg" alt="" class="delete-icon">
    </div>
    <button class="checkout-btn">Checkout</button>
    `

    cartCount.textContent = currVal 
    cartCount.style.visibility = 'visible'

    cartCard.innerHTML = html

    const removeItem = document.querySelector('.delete-icon')
    
    removeItem.addEventListener('click', () => {
        cartCount.textContent = 0 
        cartCount.style.visibility = 'hidden'
        cartCard.innerHTML = `<p>Your cart is empty.</p>`
    })
})




// mobile menu section
const hamMenu = document.querySelector('.mobile-navbar-hamburger')
const mobileCloseBtn = document.querySelector('.mobile-close-btn')


hamMenu.addEventListener('click', (e) => handleHamClick(e))
mobileCloseBtn.addEventListener('click', (e) => handleHamClick(e))

function handleHamClick(e){
    const navbar = document.querySelector('.header--nav-bar')
    const mobileOverlayScreen = document.querySelector('.mobile-overlay')

    // both close and open button functionality 
    if(hamMenu.getAttribute('aria-expanded') === 'true' && mobileCloseBtn.getAttribute('aria-expanded') === 'false'){
        navbar.setAttribute('aria-expanded', 'false')
        hamMenu.setAttribute('aria-expanded', 'false')
        mobileCloseBtn.setAttribute('aria-expanded', 'true')
        mobileOverlayScreen.setAttribute('aria-expanded', 'false')
    } else{
        navbar.setAttribute('aria-expanded', 'true')
        hamMenu.setAttribute('aria-expanded', 'true')
        mobileCloseBtn.setAttribute('aria-expanded', 'false')
        mobileOverlayScreen.setAttribute('aria-expanded', 'true')

    }
}