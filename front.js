const booktitlebuttons = document.querySelectorAll(".book")
const createCartList = document.querySelector("#cartList")
const cartBookList = []
const borrowBookList = []
const borrowButton = document.querySelector("#borrow")
const createBorrowList = document.querySelector("#bookUl")
const createLibraryList = document.querySelector("#도서")
//대여 가능 = color (green) , 대여불가능 = color(red)
let libraryBookList = [
    {
        name: "잃어버린 세계를 찾아서",
        status: "대여 가능",
        color: "green",
        amount: 1,
    },
    {
        name: "네모바지 스폰지밥",
        status: "대여 불가",
        color: "red",
        amount: 1
    },
    {
        name: "너무 힘들다",
        status: "대여 가능",
        color: "green",
        amount: 1
    }
]

createLibraryAndAddToCartList()
//현재 가지고 있는 도서목록 만들고 클릭한 도서 장바구니에 추가하는 함수
function createLibraryAndAddToCartList() {
    createLibraryList.innerHTML = ""
    for (let i = 0; i < libraryBookList.length; i++) {
        createLibraryList.innerHTML += `<div class="list"> <button class="book">${libraryBookList[i].name}</button> 
    상태 : <span >${libraryBookList[i].status}</span> <button class=${libraryBookList[i].color}></button></div>`
        const booktitlebuttons = document.querySelectorAll(".book")
        for (let i = 0; i < booktitlebuttons.length; i++) {
            booktitlebuttons[i].addEventListener("click", function () {
                alert("대여하시겠습니까?")
                if (libraryBookList[i].color == "red") {
                    alert("대여가 불가능합니다.")
                    return
                }
                const findBook = cartBookList.findIndex(function (a) {
                    return a.name == libraryBookList[i].name
                })
                if (findBook == -1) {
                    cartBookList.push({
                        name: libraryBookList[i].name,
                        amount: libraryBookList[i].amount,
                    })
                    getCreateCartList()
                } else {
                    alert("중복되었습니다.")
                }
            })
        }
    }
}

//장바구니 리스트 작성 함수
function getCreateCartList() {
    createCartList.innerHTML = ""
    let total = 0
    const amount = document.querySelector("#total")
    console.log(cartBookList)
    for (let i = 0; i < cartBookList.length; i++) {
        createCartList.innerHTML += `<li>도서 제목 : ${cartBookList[i].name} <button class ="delete"> 삭제하기 </button> </li>`
        total += cartBookList[i].amount
    }
    amount.innerHTML = total
    const deleteButtons = document.querySelectorAll(".delete")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            alert("삭제하시겠습니까?")
            cartBookList.splice(i, 1)
            getCreateCartList()
        })
    }
}

clearCartAndAddToBorrowList()

//장바구니 비우고 선택된 도서 현재대여현황에 넣는 함수
function clearCartAndAddToBorrowList() {
    createLibraryAndAddToCartList()
    borrowButton.addEventListener("click", function () {
        if (cartBookList.length == 0) {
            alert("도서를 선택하세요")
        } else {
            alert("2023-10-20일까지 반납하시기 바랍니다.")
            for (let i = 0; i < cartBookList.length; i++) {
                borrowBookList.push({
                    name: cartBookList[i].name,
                    amount: cartBookList[i].amount,
                })
            }
            console.log(borrowBookList)
            cartBookList.splice(0, cartBookList.length)
            getCreateCartList()
            console.log(cartBookList)
            createBorrowList.innerHTML = ""
            for (let i = 0; i < borrowBookList.length; i++) {
                //수량에 css 하려면 어케해야함?
                createBorrowList.innerHTML += `<li>책 제목 : ${borrowBookList[i].name} <span> 수량 : ${borrowBookList[i].amount}</span></li>`
                const findList = libraryBookList.findIndex(function (a) {
                    return a.name == borrowBookList[i].name
                })
                libraryBookList[findList].color = "red"
                libraryBookList[findList].status = "대여 불가"
                createLibraryAndAddToCartList()
            }
        }
    })
}

//중복되는거 함수로 줄이기
//라우트연결하기 