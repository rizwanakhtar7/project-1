const elements = {
  grid: document.querySelector('.grid'),
  colors: document.querySelector('.colors'),
  width: 4,
  cells: [],
  score: 0,
  displayScore: document.getElementById('currentScore'),
  bestScore: 0,
  startGame: document.querySelector('.start_game'),
  displayBestScore: document.querySelector('#bestScore'),
  winningMsg: document.querySelector('.winner_message'),
  losingMsg: document.querySelector('.losing_message'),
  playerScores: [],
  leadershipList: document.querySelector('ol'),
  player: {},
  playAgain: document.querySelector('.play_again'),
}

if (localStorage) {
  elements.playerScores = JSON.parse(localStorage.getItem('playerScores')) || []
  orderAndDisplayScores()
}

function orderAndDisplayScores() {
  const array = elements.playerScores
    .sort((playerA, playerB) => playerB.score - playerA.score)
    .map(player => {
      return `<li class="leaders">
        ${player.name} with score of: <b><em>${player.score}</em></b>
        <img src="./images/star_PNG.png" height="20" width="20" />
      </li>`
    })
  //create top three high scores array
  const topThreeArr = array.splice(0, 3)
  elements.leadershipList.innerHTML = topThreeArr.join('')
}

//create the Board
for (let index = 0; index < elements.width ** 2; index++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)
  div.setAttribute('gridnumber', index)
  div.style.width = `${100 / elements.width}%`
  div.style.height = `${100 / elements.width}%`
  elements.cells.push(div)
}

function resetGame() {
  elements.winningMsg.classList.remove('show')
  elements.losingMsg.classList.remove('show')
  elements.cells.forEach((grid) => {
    grid.classList.remove('Number')
    grid.classList.remove('two')
    grid.classList.remove('four')
    grid.classList.remove('eight')
    grid.classList.remove('sixteen')
    grid.classList.remove('thirty-two')
    grid.classList.remove('sixty-four')
    grid.classList.remove('higher_numbers')
    grid.innerHTML = ''
  })
}

elements.startGame.addEventListener('click', () => {

  const userChoice = prompt('Please select a username/ name')
  elements.player['name'] = userChoice

  resetGame()
  bestScoreSave()

  //reset scores for new game
  elements.score = 0
  elements.displayScore.innerHTML = 0
  //Generate two random numbers on start game
  randomSpotAndNumberGenerator(elements.width)
  randomSpotAndNumberGenerator(elements.width)
})

function randomSpotAndNumberGenerator(width) {
  //If all grids have numbers populated then stop game 
  const isEveryCellPopulated = elements.cells.every((cell) => cell.innerHTML > 0)
  if (isEveryCellPopulated) {
    return gameOver()
  }

  //generate random number 2 or 4 from array
  const twoOrFourArr = [2, 4]
  const randomIdx = Math.floor(Math.random() * twoOrFourArr.length)
  const twoOrFourNumber = twoOrFourArr[randomIdx]
  const randomNumberOnGrid = Math.floor(Math.random() * (width ** 2))

  if (elements.cells[randomNumberOnGrid].innerHTML === '') {
    elements.cells[randomNumberOnGrid].className = 'Number'
    elements.cells[randomNumberOnGrid].innerHTML = twoOrFourNumber
    if (twoOrFourNumber === 2) {
      elements.cells[randomNumberOnGrid].classList.add('two')
    } else {
      elements.cells[randomNumberOnGrid].classList.add('four')
    }
  } else {
    randomSpotAndNumberGenerator(elements.width)
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'ArrowDown') {
    moveGridsDownwards()
    randomSpotAndNumberGenerator(elements.width)
  } else if (key === 'ArrowUp') {
    moveGridsUpwards()
    randomSpotAndNumberGenerator(elements.width)
  } else if (key === 'ArrowLeft') {
    moveGridsLeft()
    randomSpotAndNumberGenerator(elements.width)
  } else if (key === 'ArrowRight') {
    moveGridsRight()
    randomSpotAndNumberGenerator(elements.width)
  }
})

//Function to combine identical numbers in row & column
function numberMergeCalculate(startIndexNumber, arrCol) {
  if (startIndexNumber === 3) {
    while (startIndexNumber >= 0) {
      if (arrCol[startIndexNumber] === arrCol[startIndexNumber - 1]) {
        arrCol[startIndexNumber] += arrCol[startIndexNumber - 1]
        arrCol[startIndexNumber - 1] = 0
        elements.score += Number(arrCol[startIndexNumber])
      }
      elements.displayScore.innerHTML = elements.score
      startIndexNumber--
    }
  } else if (startIndexNumber === 0) {
    while (startIndexNumber < 3) {
      if (arrCol[startIndexNumber + 1] === arrCol[startIndexNumber]) {
        arrCol[startIndexNumber] += arrCol[startIndexNumber + 1]
        arrCol[startIndexNumber + 1] = 0
        elements.score += Number(arrCol[startIndexNumber])
      }
      elements.displayScore.innerHTML = elements.score
      startIndexNumber++
    }
  }
}

function columnArrayBuilder(columnOne, columnTwo, columnThree, columnFour) {
  for (let i = 0; i < elements.width ** 2; i += elements.width) {
    columnOne.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 1; i < elements.width ** 2; i += elements.width) {
    columnTwo.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 2; i < elements.width ** 2; i += elements.width) {
    columnThree.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 3; i < elements.width ** 2; i += elements.width) {
    columnFour.push(Number(elements.cells[i].innerHTML))
  }
}

function arrayRowBuilder(rowOne, rowTwo, rowThree, rowFour) {
  for (let i = 0; i < elements.width; i++) {
    rowOne.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 4; i < elements.width * 2; i++) {
    rowTwo.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 8; i < elements.width * 3; i++) {
    rowThree.push(Number(elements.cells[i].innerHTML))
  }
  for (let i = 12; i < elements.width ** 2; i++) {
    rowFour.push(Number(elements.cells[i].innerHTML))
  }
}

const filterArray = (array) => array.filter(numb => numb)

function moveGridsDownwards() {
  const firstColumn = [], secondColumn = [], thirdColumn = [], fourthColumn = []
  columnArrayBuilder(firstColumn, secondColumn, thirdColumn, fourthColumn)
  //Filter array of 0's
  const firstCol = filterArray(firstColumn)
  let missingIndexesInArray = 4 - firstCol.length

  const updatedFirstColArr = [...new Array(missingIndexesInArray).fill(0), ...firstCol]
  //append columns to the grid
  for (let i = 0; i < 16; i += 4) {
    let updatedFirstColIdx = 0
    elements.cells[i].innerHTML = updatedFirstColArr[updatedFirstColIdx]
    updatedFirstColIdx++
  }

  //Call function to merge numbers which are the same
  numberMergeCalculate(3, updatedFirstColArr)

  const ColumnAfterCombiningFirstCol = [updatedFirstColArr[0], updatedFirstColArr[1], updatedFirstColArr[2], updatedFirstColArr[3]]

  const firstColPostCombineFilter = filterArray(ColumnAfterCombiningFirstCol)

  missingIndexesInArray = 4 - firstColPostCombineFilter.length

  const finalSortedAndCombinedFirstCol = [...new Array(missingIndexesInArray).fill(0), ...firstColPostCombineFilter]

  elements.cells[0].innerHTML = finalSortedAndCombinedFirstCol[0]
  elements.cells[elements.width].innerHTML = finalSortedAndCombinedFirstCol[1]
  elements.cells[elements.width * 2].innerHTML = finalSortedAndCombinedFirstCol[2]
  elements.cells[elements.width * 3].innerHTML = finalSortedAndCombinedFirstCol[3]

  const secondCol = filterArray(secondColumn)

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...new Array(missingIndexesInArray).fill(0), ...secondCol]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]

  numberMergeCalculate(3, updatedSecondColArr)

  const ColumnAfterCombiningSecondCol = [updatedSecondColArr[0], updatedSecondColArr[1], updatedSecondColArr[2], updatedSecondColArr[3]]
  const secondColPostCombineFilter = filterArray(ColumnAfterCombiningSecondCol)

  missingIndexesInArray = 4 - secondColPostCombineFilter.length

  const finalSortedAndCombinedSecondCol = [...new Array(missingIndexesInArray).fill(0), ...secondColPostCombineFilter]

  elements.cells[1].innerHTML = finalSortedAndCombinedSecondCol[0]
  elements.cells[1 + elements.width].innerHTML = finalSortedAndCombinedSecondCol[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = finalSortedAndCombinedSecondCol[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = finalSortedAndCombinedSecondCol[3]

  const thirdCol = filterArray(thirdColumn)

  missingIndexesInArray = 4 - thirdCol.length

  const updatedThirdColArr = [...new Array(missingIndexesInArray).fill(0), ...thirdCol]
  elements.cells[2].innerHTML = updatedThirdColArr[0]
  elements.cells[2 + elements.width].innerHTML = updatedThirdColArr[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = updatedThirdColArr[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = updatedThirdColArr[3]

  numberMergeCalculate(3, updatedThirdColArr)

  const ColumnAfterCombiningThirdCol = [updatedThirdColArr[0], updatedThirdColArr[1], updatedThirdColArr[2], updatedThirdColArr[3]]

  const thirdColPostCombineFilter = filterArray(ColumnAfterCombiningThirdCol)

  missingIndexesInArray = 4 - thirdColPostCombineFilter.length

  const finalSortedAndCombinedThirdCol = [...new Array(missingIndexesInArray).fill(0), ...thirdColPostCombineFilter]

  elements.cells[2].innerHTML = finalSortedAndCombinedThirdCol[0]
  elements.cells[2 + elements.width].innerHTML = finalSortedAndCombinedThirdCol[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = finalSortedAndCombinedThirdCol[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = finalSortedAndCombinedThirdCol[3]

  const fourthCol = filterArray(fourthColumn)

  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...new Array(missingIndexesInArray).fill(0), ...fourthCol]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]

  numberMergeCalculate(3, updatedFourthColArr)

  const ColumnAfterCombining = [updatedFourthColArr[0], updatedFourthColArr[1], updatedFourthColArr[2], updatedFourthColArr[3]]

  const fourthColPostCombineFilter = filterArray(ColumnAfterCombining)

  missingIndexesInArray = 4 - fourthColPostCombineFilter.length

  const FinalSortedAndCombinedCol = [...new Array(missingIndexesInArray).fill(0), ...fourthColPostCombineFilter]

  elements.cells[3].innerHTML = FinalSortedAndCombinedCol[0]
  elements.cells[3 + elements.width].innerHTML = FinalSortedAndCombinedCol[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedCol[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedCol[3]
  //make sure numbers have same font size /style
  addNumbClass()
}

function moveGridsUpwards() {
  const firstColumn = [], secondColumn = [], thirdColumn = [], fourthColumn = []
  columnArrayBuilder(firstColumn, secondColumn, thirdColumn, fourthColumn)

  const firstCol = filterArray(firstColumn)

  let missingIndexesInArray = 4 - firstCol.length
  const updatedFirstColArr = [...firstCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstColArr[0]
  elements.cells[elements.width].innerHTML = updatedFirstColArr[1]
  elements.cells[elements.width * 2].innerHTML = updatedFirstColArr[2]
  elements.cells[elements.width * 3].innerHTML = updatedFirstColArr[3]

  numberMergeCalculate(0, updatedFirstColArr)

  const ColumnAfterCombiningFirstCol = [updatedFirstColArr[0], updatedFirstColArr[1], updatedFirstColArr[2], updatedFirstColArr[3]]

  const firstColPostCombineFilter = filterArray(ColumnAfterCombiningFirstCol)

  missingIndexesInArray = 4 - firstColPostCombineFilter.length

  const FinalSortedAndCombinedFirstCol = [...firstColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstCol[0]
  elements.cells[0 + elements.width].innerHTML = FinalSortedAndCombinedFirstCol[1]
  elements.cells[0 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedFirstCol[2]
  elements.cells[0 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedFirstCol[3]

  const secondCol = filterArray(secondColumn)

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...secondCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]

  numberMergeCalculate(0, updatedSecondColArr)

  const ColumnAfterCombiningSecondCol = [updatedSecondColArr[0], updatedSecondColArr[1], updatedSecondColArr[2], updatedSecondColArr[3]]

  const secondColPostCombineFilter = filterArray(ColumnAfterCombiningSecondCol)

  missingIndexesInArray = 4 - secondColPostCombineFilter.length

  const FinalSortedAndCombinedSecondCol = [...secondColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[1].innerHTML = FinalSortedAndCombinedSecondCol[0]
  elements.cells[1 + elements.width].innerHTML = FinalSortedAndCombinedSecondCol[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedSecondCol[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedSecondCol[3]

  const thirdCol = filterArray(thirdColumn)

  missingIndexesInArray = 4 - thirdCol.length

  const updatedThirdColArr = [...thirdCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[2].innerHTML = updatedThirdColArr[0]
  elements.cells[2 + elements.width].innerHTML = updatedThirdColArr[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = updatedThirdColArr[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = updatedThirdColArr[3]

  numberMergeCalculate(0, updatedThirdColArr)

  const ColumnAfterCombining = [updatedThirdColArr[0], updatedThirdColArr[1], updatedThirdColArr[2], updatedThirdColArr[3]]
  const thirdColPostCombineFilter = filterArray(ColumnAfterCombining)

  missingIndexesInArray = 4 - thirdColPostCombineFilter.length

  const FinalSortedAndCombinedThirdCol = [...thirdColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[2].innerHTML = FinalSortedAndCombinedThirdCol[0]
  elements.cells[2 + elements.width].innerHTML = FinalSortedAndCombinedThirdCol[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedThirdCol[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedThirdCol[3]

  const fourthCol = filterArray(fourthColumn)

  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...fourthCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]

  numberMergeCalculate(0, updatedFourthColArr)

  const ColumnAfterCombiningForFourth = [updatedFourthColArr[0], updatedFourthColArr[1], updatedFourthColArr[2], updatedFourthColArr[3]]

  const fourthColPostCombineFilter = filterArray(ColumnAfterCombiningForFourth)

  missingIndexesInArray = 4 - fourthColPostCombineFilter.length

  const FinalSortedAndCombinedCol = [...fourthColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[3].innerHTML = FinalSortedAndCombinedCol[0]
  elements.cells[3 + elements.width].innerHTML = FinalSortedAndCombinedCol[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedCol[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedCol[3]
  addNumbClass()
}


function moveGridsLeft() {
  const firstRow = [], secondRow = [], thirdRow = [], fourthRow = []
  arrayRowBuilder(firstRow, secondRow, thirdRow, fourthRow)

  const firstRowUpdated = filterArray(firstRow)

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...firstRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  numberMergeCalculate(0, updatedFirstRowArr)

  const firstRowAfterCombining = [updatedFirstRowArr[0], updatedFirstRowArr[1], updatedFirstRowArr[2], updatedFirstRowArr[3]]

  const firstRowPostCombineFilter = filterArray(firstRowAfterCombining)

  missingIndexesInArray = 4 - firstRowPostCombineFilter.length

  const FinalSortedAndCombinedFirstRow = [...firstRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstRow[0]
  elements.cells[1].innerHTML = FinalSortedAndCombinedFirstRow[1]
  elements.cells[2].innerHTML = FinalSortedAndCombinedFirstRow[2]
  elements.cells[3].innerHTML = FinalSortedAndCombinedFirstRow[3]

  const secondRowUpdated = filterArray(secondRow)

  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...secondRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]

  numberMergeCalculate(0, updatedSecondRowArr)

  const secondRowAfterCombining = [updatedSecondRowArr[0], updatedSecondRowArr[1], updatedSecondRowArr[2], updatedSecondRowArr[3]]
  const secondRowPostCombineFilter = filterArray(secondRowAfterCombining)

  missingIndexesInArray = 4 - secondRowPostCombineFilter.length
  const FinalSortedAndCombinedSecondRow = [...secondRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[4].innerHTML = FinalSortedAndCombinedSecondRow[0]
  elements.cells[5].innerHTML = FinalSortedAndCombinedSecondRow[1]
  elements.cells[6].innerHTML = FinalSortedAndCombinedSecondRow[2]
  elements.cells[7].innerHTML = FinalSortedAndCombinedSecondRow[3]

  const thirdRowUpdated = filterArray(thirdRow)

  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...thirdRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]

  numberMergeCalculate(0, updatedThirdRowArr)

  const thirdRowAfterCombining = [updatedThirdRowArr[0], updatedThirdRowArr[1], updatedThirdRowArr[2], updatedThirdRowArr[3]]

  const thirdRowPostCombineFilter = filterArray(thirdRowAfterCombining)

  missingIndexesInArray = 4 - thirdRowPostCombineFilter.length
  const FinalSortedAndCombinedThirdRow = [...thirdRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[8].innerHTML = FinalSortedAndCombinedThirdRow[0]
  elements.cells[9].innerHTML = FinalSortedAndCombinedThirdRow[1]
  elements.cells[10].innerHTML = FinalSortedAndCombinedThirdRow[2]
  elements.cells[11].innerHTML = FinalSortedAndCombinedThirdRow[3]

  const fourthRowUpdated = filterArray(fourthRow)

  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...fourthRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  numberMergeCalculate(0, updatedFourthRowArr)

  const fourthRowAfterCombining = [updatedFourthRowArr[0], updatedFourthRowArr[1], updatedFourthRowArr[2], updatedFourthRowArr[3]]

  const fourthRowPostCombineFilter = filterArray(fourthRowAfterCombining)

  missingIndexesInArray = 4 - fourthRowPostCombineFilter.length

  const FinalSortedAndCombinedFourthRow = [...fourthRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[12].innerHTML = FinalSortedAndCombinedFourthRow[0]
  elements.cells[13].innerHTML = FinalSortedAndCombinedFourthRow[1]
  elements.cells[14].innerHTML = FinalSortedAndCombinedFourthRow[2]
  elements.cells[15].innerHTML = FinalSortedAndCombinedFourthRow[3]

  addNumbClass()
}

function moveGridsRight() {
  const firstRow = [], secondRow = [], thirdRow = [], fourthRow = []
  arrayRowBuilder(firstRow, secondRow, thirdRow, fourthRow)

  const firstRowUpdated = filterArray(firstRow)

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...new Array(missingIndexesInArray).fill(0), ...firstRowUpdated]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  numberMergeCalculate(3, updatedFirstRowArr)

  const firstRowAfterCombining = [updatedFirstRowArr[0], updatedFirstRowArr[1], updatedFirstRowArr[2], updatedFirstRowArr[3]]

  const firstRowPostCombineFilter = filterArray(firstRowAfterCombining)

  missingIndexesInArray = 4 - firstRowPostCombineFilter.length

  const FinalSortedAndCombinedFirstRow = [...new Array(missingIndexesInArray).fill(0), ...firstRowPostCombineFilter]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstRow[0]
  elements.cells[1].innerHTML = FinalSortedAndCombinedFirstRow[1]
  elements.cells[2].innerHTML = FinalSortedAndCombinedFirstRow[2]
  elements.cells[3].innerHTML = FinalSortedAndCombinedFirstRow[3]

  const secondRowUpdated = filterArray(secondRow)

  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...new Array(missingIndexesInArray).fill(0), ...secondRowUpdated]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]

  numberMergeCalculate(3, updatedSecondRowArr)

  const secondRowAfterCombining = [updatedSecondRowArr[0], updatedSecondRowArr[1], updatedSecondRowArr[2], updatedSecondRowArr[3]]

  const secondRowPostCombineFilter = filterArray(secondRowAfterCombining)

  missingIndexesInArray = 4 - secondRowPostCombineFilter.length
  const FinalSortedAndCombinedSecondRow = [...new Array(missingIndexesInArray).fill(0), ...secondRowPostCombineFilter]

  elements.cells[4].innerHTML = FinalSortedAndCombinedSecondRow[0]
  elements.cells[5].innerHTML = FinalSortedAndCombinedSecondRow[1]
  elements.cells[6].innerHTML = FinalSortedAndCombinedSecondRow[2]
  elements.cells[7].innerHTML = FinalSortedAndCombinedSecondRow[3]

  const thirdRowUpdated = filterArray(thirdRow)

  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...new Array(missingIndexesInArray).fill(0), ...thirdRowUpdated]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]

  numberMergeCalculate(3, updatedThirdRowArr)

  const thirdRowAfterCombining = [updatedThirdRowArr[0], updatedThirdRowArr[1], updatedThirdRowArr[2], updatedThirdRowArr[3]]

  const thirdRowPostCombineFilter = filterArray(thirdRowAfterCombining)

  missingIndexesInArray = 4 - thirdRowPostCombineFilter.length

  const FinalSortedAndCombinedThirdRow = [...new Array(missingIndexesInArray).fill(0), ...thirdRowPostCombineFilter]

  elements.cells[8].innerHTML = FinalSortedAndCombinedThirdRow[0]
  elements.cells[9].innerHTML = FinalSortedAndCombinedThirdRow[1]
  elements.cells[10].innerHTML = FinalSortedAndCombinedThirdRow[2]
  elements.cells[11].innerHTML = FinalSortedAndCombinedThirdRow[3]

  const fourthRowUpdated = filterArray(fourthRow)

  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...new Array(missingIndexesInArray).fill(0), ...fourthRowUpdated]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  numberMergeCalculate(3, updatedFourthRowArr)

  const fourthRowAfterCombining = [updatedFourthRowArr[0], updatedFourthRowArr[1], updatedFourthRowArr[2], updatedFourthRowArr[3]]
  const fourthRowPostCombineFilter = filterArray(fourthRowAfterCombining)

  missingIndexesInArray = 4 - fourthRowPostCombineFilter.length

  const FinalSortedAndCombinedFourthRow = [...new Array(missingIndexesInArray).fill(0), ...fourthRowPostCombineFilter]
  elements.cells[12].innerHTML = FinalSortedAndCombinedFourthRow[0]
  elements.cells[13].innerHTML = FinalSortedAndCombinedFourthRow[1]
  elements.cells[14].innerHTML = FinalSortedAndCombinedFourthRow[2]
  elements.cells[15].innerHTML = FinalSortedAndCombinedFourthRow[3]

  addNumbClass()
}

const gameOver = () => { 

  //show top 3 player scores
  elements.player['score'] = elements.score
  elements.playerScores.push(elements.player)
  orderAndDisplayScores()
  if (localStorage) {
    localStorage.setItem('playerScores', JSON.stringify(elements.playerScores))
  }
  elements.losingMsg.classList.add('show')

}

const winner = () => elements.winningMsg.classList.add('show')

function addNumbClass() {
  elements.cells.forEach((grid) => {
    if (grid.innerHTML === '2048') {
      winner()
    }
    grid.classList.remove('two')
    grid.classList.remove('four')
    grid.classList.remove('eight')
    grid.classList.remove('sixteen')
    grid.classList.remove('thirty-two')
    grid.classList.remove('sixty-four')
    grid.classList.remove('higher_numbers')

    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.classList.remove('two')
      grid.classList.remove('four')
      grid.classList.remove('eight')
      grid.classList.remove('sixteen')
      grid.classList.remove('thirty-two')
      grid.classList.remove('sixty-four')
      grid.classList.remove('higher_numbers')
      grid.innerHTML = ''
    } else if (grid.innerHTML === '2') {
      grid.classList.add('two')
    } else if (grid.innerHTML === '4') {
      grid.classList.add('four')
    } else if (grid.innerHTML === '8') {
      grid.classList.add('eight')
    } else if (grid.innerHTML === '16') {
      grid.classList.add('sixteen')
    } else if (grid.innerHTML === '32') {
      grid.classList.add('thirty-two')
    } else if (grid.innerHTML === '64') {
      grid.classList.add('sixty-four')
    } else {
      grid.classList.add('higher_numbers')
    }
  })
}

//When user clicks play again
const playAgain = () => window.location.reload()

function bestScoreSave() {
  if (elements.score > 0 && elements.score > elements.bestScore) {
    elements.bestScore = elements.score
    elements.displayBestScore.innerHTML = elements.score
  }
}
