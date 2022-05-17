        const plusBtns = document.querySelector('.js-plus')
        const SubMenu = document.querySelector('.js-subMenu')
        const minusBtns = document.querySelector('.js-minus')

        const plusNike = document.querySelector('.js-plus-Nike')
        const SubMenu_Nike = document.querySelector('.list-Nike')
        const minusNike = document.querySelector('.js-minus-Nike')

        const plusAdidas = document.querySelector('.js-plus-Adidas')
        const SubMenu_Adidas = document.querySelector('.list-Adidas')
        const minusAdidas = document.querySelector('.js-minus-Adidas')

        const right_modal = document.querySelector('.right__nav__overlay')
        const left_bar = document.querySelector('.left__bar')
        const right_modalContainer = document.querySelector('.right__nav__mobile')

        const left_modal = document.querySelector('.left__nav__overlay')
        const right_bar = document.querySelector('.right__bar')
        const left_modalContainer = document.querySelector('.left__nav__mobile')

        function showSubMenu() {
            SubMenu.classList.add('open')
            plusBtns.classList.add('close')
            minusBtns.classList.add('open')
        }

        function hiddenSubMenu() {
            SubMenu.classList.remove('open')
            plusBtns.classList.remove('close')
            minusBtns.classList.remove('open')
        }
        
        plusBtns.addEventListener('click', showSubMenu)
        minusBtns.addEventListener('click', hiddenSubMenu)

        function showListNike() {
            SubMenu_Nike.classList.add('open')
            minusNike.classList.add('open')
            plusNike.classList.add('close')
        }

        function hiddenListNike() {
            SubMenu_Nike.classList.remove('open')
            plusNike.classList.remove('close')
            minusNike.classList.remove('open')
        }
        
        plusNike.addEventListener('click', showListNike)
        minusNike.addEventListener('click', hiddenListNike)

        function showListAdidas() {
            SubMenu_Adidas.classList.add('open')
            minusAdidas.classList.add('open')
            plusAdidas.classList.add('close')
        }

        function hiddenListAdidas() {
            SubMenu_Adidas.classList.remove('open')
            plusAdidas.classList.remove('close')
            minusAdidas.classList.remove('open')
        }
        
        plusAdidas.addEventListener('click', showListAdidas)
        minusAdidas.addEventListener('click', hiddenListAdidas)

        function showRightModal() {
            right_modal.classList.add('open')
        }

        left_bar.addEventListener('click', showRightModal)

        function hiddenRightModal() {
            right_modal.classList.remove('open')
        }

        right_modal.addEventListener('click', hiddenRightModal)

        right_modalContainer.addEventListener('click', function (event) {
            event.stopPropagation()
        })

        function showLeftModal() {
            left_modal.classList.add('open')
        }

        //right_bar.addEventListener('click', showLeftModal)

        function hiddenLeftModal() {
            left_modal.classList.remove('open')
        }

        //left_modal.addEventListener('click', hiddenLeftModal)

        // left_modalContainer.addEventListener('click', function (event) {
        //     event.stopPropagation()
        // })