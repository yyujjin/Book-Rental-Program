const booktitlebuttons = document.querySelectorAll(".book")
const borrowBookList = []
const borrowButton = document.querySelector("#borrow")
const createBorrowList = document.querySelector("#bookUl")
const createLibraryList = document.querySelector("#bookdiv")
const totalSpan = document.querySelector("#total")
console.log(totalSpan)
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
        amount: 1,
    },
    {
        name: "너무 힘들다",
        status: "대여 가능",
        color: "green",
        amount: 1,
    },
]

createLibraryAndAddToBorrowBookList()
//현재 가지고 있는 도서목록 만들고 클릭한 도서 대여 현황에 추가
function createLibraryAndAddToBorrowBookList() {
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
                const findBook = borrowBookList.findIndex(function (a) {
                    return a.name == libraryBookList[i].name
                })
                if (findBook == -1) {
                    borrowBookList.push({
                        name: libraryBookList[i].name,
                        amount: libraryBookList[i].amount,
                    })
                    console.log(borrowBookList)
                    getCreateborrowList()
                }
            })
        }
    }
}

getCreateborrowList()
//도서대여현황 리스트 재작성 함수
function getCreateborrowList() {
    createBorrowList.innerHTML = ""
    let total = 0
    for (let i = 0; i < borrowBookList.length; i++) {
        createBorrowList.innerHTML += `<li class = "list">책 제목 : ${borrowBookList[i].name}</li>`
        total++
        totalSpan.innerHTML = `총 ${total} 권`

        const findList = libraryBookList.findIndex(function (a) {
            return a.name == borrowBookList[i].name
        })

        libraryBookList[findList].color = "red"
        libraryBookList[findList].status = "대여 불가"
        createLibraryAndAddToBorrowBookList()
    }
}
