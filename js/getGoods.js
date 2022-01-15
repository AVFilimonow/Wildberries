const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')
    const viewAll = document.querySelector('.more')

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')
        goodsContainer.innerHTML = ''
        goods.forEach(good => {
            const goodBlock = document.createElement('div')
            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')
            goodBlock.innerHTML = `
                <div class="goods-card">
                            <span class="label ${good.label ? null : "d-none"}">${good.label}</span>
                            <img src="db/${good.img}" alt=${good.name} class="goods-image">
                            <h3 class="goods-title">${good.name}</h3>                           
                            <p class="goods-description">${good.description}</p>                           
                            <button class="button goods-card-btn add-to-cart" data-id=${good.id}>
                                <span class="button-price">$${good.price}</span>
                            </button>
                           
                </div>
                     
            `
            goodsContainer.append(goodBlock)
        })
    }

    const getData = (category, value) => {
        fetch('./db/db.json')
            .then((response) => response.json())

            .then((data) => {
                const array = category ? data.filter((item) => item[category] === value) : data
                localStorage.setItem('goods', JSON.stringify(array))
                if (window.location.pathname !== '/Wildberries/goods.html') {
                    window.location.href = "/Wildberries/goods.html"
                } else {
                    renderGoods(array)
                }

            })
    }

    links.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault()

            const category = item.dataset.field
            const linkValue = item.textContent
            getData(category, linkValue);
        })
    })

    if (localStorage.getItem('goods') && window.location.pathname === '/Wildberries/goods.html') {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }

    if (viewAll) {
        viewAll.addEventListener('click', () => {
            getData()
        })
    }

}

getGoods();