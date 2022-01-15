const cartBtn = document.querySelector('.button-cart')
const cart = document.getElementById('modal-cart')
const modalClose = cart.querySelector('.modal-close')
const goodsContainer = document.querySelector('.long-goods-list')
const cartTable = document.querySelector('.cart-table__goods')
const modalForm = document.querySelector('.modal-form')

const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(good => {
        return good.id !== id
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
}

const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.map(good => {
        if (good.id === id) {
            good.count++
        }
        return good
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
}

const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
        if (good.id === id) {
            if (good.count > 0) {
                good.count--
            }
        }
        return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
}

const renderCartGoods = (goods) => {
    cartTable.innerHTML = ''
    goods.forEach(good => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
						<td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td>${+good.count * +good.price}$</td>
						<td><button class="cart-btn-delete"">x</button></td>					
                    `
        cartTable.append(tr)

        tr.addEventListener('click', (e) => {

            if (e.target.classList.contains('cart-btn-minus')) {
                minusCartItem(good.id)
            } else if (e.target.classList.contains('cart-btn-plus')) {
                plusCartItem(good.id)
            } else if (e.target.classList.contains('cart-btn-delete')) {
                deleteCartItem(good.id)
            }
        })
    })

}

const sendForm = () => {
    const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : []
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            cartArray: cartArray,
            name: '',
            phone: ''
        })
    }).then(() => {
        cart.style.display = ""
        localStorage.removeItem('cart');
    })
}

modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendForm()
})

cartBtn.addEventListener('click', function () {

    const cartArray = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : []

    renderCartGoods(cartArray)
    cart.style.display = "flex"
})

modalClose.addEventListener('click', function () {
    cart.style.display = ""
})

const addToCart = (goodId) => {
    const goods = JSON.parse(localStorage.getItem('goods'))
    const clickedGood = goods.find(good => good.id === goodId)

    const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : []

    if (cart.some(good => good.id === clickedGood.id)) {
        cart.map(good => {
            if (good.id === clickedGood.id) {
                good.count++
            }
            return good
        })
        console.log("Увеличить кол-во товара")
    } else {
        console.log("Добавить новую позицию")
        clickedGood.count = 1;
        cart.push(clickedGood);
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const buttonToCart = e.target.closest('.add-to-cart');
            const goodId = buttonToCart.dataset.id;
            addToCart(goodId)
        }
    })
}