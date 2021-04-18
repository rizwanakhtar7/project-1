const elements = {
  grid: document.querySelector('.grid'),
  width: 4,
  cells: [],
  score: 0,
  bestScore: 0,
  startGame: document.querySelector('.start_game'),
}

//create the 2048 board

for (let index = 0; index < elements.width ** 2; index++) {
  const div = document.createElement('div')
  elements.grid.appendChild(div)


  //adding custom number to each grid cell
  div.setAttribute('gridnumber', index)
  div.style.width = `${100 / elements.width}%`
  div.style.height = `${100 / elements.width}%`
  elements.cells.push(div)
}

elements.startGame.addEventListener('click', () => {
  //First set squares to null before playing 
  elements.cells.forEach((grid) => {
    grid.classList.remove('Number')
    grid.innerHTML = ''
  })

  
  //add condition for score and bestScore here

  //should generate two random spots with 2 or 4 
  randomSpotAndNumberGenerator(elements.width)
  randomSpotAndNumberGenerator(elements.width)
})


function randomSpotAndNumberGenerator(width) {
  
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
  } else {
    randomSpotAndNumberGenerator(elements.width)
  }

}

document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'ArrowDown') {
    moveGridsDownwards()
    randomSpotAndNumberGenerator(elements.width)

    console.log('down pressed')
  } else if (key === 'ArrowUp') {
    moveGridsUpwards()
    randomSpotAndNumberGenerator(elements.width)

    console.log('up pressed')
  } else if (key === 'ArrowLeft') {
    console.log('left pressed')
    moveGridsLeft()
    randomSpotAndNumberGenerator(elements.width)


  } else if (key === 'ArrowRight') {
    moveGridsRight()
    randomSpotAndNumberGenerator(elements.width)

    console.log('right pressed')

  }
})

function moveGridsDownwards() {
  const firstColumn = [], secondColumn = [], thirdColumn = [], fourthColumn = []
  //First column 
  for (let i = 0; i < elements.width ** 2; i += elements.width) {
    firstColumn.push(Number(elements.cells[i].innerHTML))
  }

  // second column 
  for (let i = 1; i < elements.width ** 2; i += elements.width) {
    secondColumn.push(Number(elements.cells[i].innerHTML))
  }

  // third column 
  for (let i = 2; i < elements.width ** 2; i += elements.width) {
    thirdColumn.push(Number(elements.cells[i].innerHTML))
  }

  // fourth column 
  for (let i = 3; i < elements.width ** 2; i += elements.width) {
    fourthColumn.push(Number(elements.cells[i].innerHTML))
  }

  //filter out zeros to fill with zeros in correct place
  const firstCol = firstColumn.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstCol.length

  const updatedFirstColArr = [...new Array(missingIndexesInArray).fill(0), ...firstCol]

  for (let i = 0; i < 16; i += 4) {
    let updatedFirstColIdx = 0
    elements.cells[i].innerHTML = updatedFirstColArr[updatedFirstColIdx]
    updatedFirstColIdx++
  }

  //Checks if any are the same

  if (updatedFirstColArr[3] === updatedFirstColArr[2]) {
    updatedFirstColArr[3] = updatedFirstColArr[3] + updatedFirstColArr[2]
    updatedFirstColArr[2] = 0
    elements.score += updatedFirstColArr[3]


  }

  if (updatedFirstColArr[2] === updatedFirstColArr[1]) {
    updatedFirstColArr[2] = updatedFirstColArr[2] + updatedFirstColArr[1]
    updatedFirstColArr[1] = 0
    elements.score += updatedFirstColArr[2]


  }

  if (updatedFirstColArr[1] === updatedFirstColArr[0]) {
    updatedFirstColArr[1] = updatedFirstColArr[1] + updatedFirstColArr[0]
    updatedFirstColArr[0] = 0
    elements.score += updatedFirstColArr[1]


  }

  const ColumnAfterCombiningFirstCol = [updatedFirstColArr[0], updatedFirstColArr[1], updatedFirstColArr[2], updatedFirstColArr[3]]

  const firstColPostCombineFilter = ColumnAfterCombiningFirstCol.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - firstColPostCombineFilter.length

  const finalSortedAndCombinedFirstCol = [...new Array(missingIndexesInArray).fill(0), ...firstColPostCombineFilter]
  console.log(finalSortedAndCombinedFirstCol)

  elements.cells[0].innerHTML = finalSortedAndCombinedFirstCol[0]
  elements.cells[elements.width].innerHTML = finalSortedAndCombinedFirstCol[1]
  elements.cells[elements.width * 2].innerHTML = finalSortedAndCombinedFirstCol[2]
  elements.cells[elements.width * 3].innerHTML = finalSortedAndCombinedFirstCol[3]


  //END OF COMBINE 1st COL

  const secondCol = secondColumn.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...new Array(missingIndexesInArray).fill(0), ...secondCol]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]



  //2ND COL COMBINER 

  if (updatedSecondColArr[3] === updatedSecondColArr[2]) {
    updatedSecondColArr[3] = updatedSecondColArr[3] + updatedSecondColArr[2]
    updatedSecondColArr[2] = 0
    elements.score += updatedFirstColArr[3]

  }

  if (updatedSecondColArr[2] === updatedSecondColArr[1]) {
    updatedSecondColArr[2] = updatedSecondColArr[2] + updatedSecondColArr[1]
    updatedSecondColArr[1] = 0
    elements.score += updatedFirstColArr[2]


  }

  if (updatedSecondColArr[1] === updatedSecondColArr[0]) {
    updatedSecondColArr[1] = updatedSecondColArr[1] + updatedSecondColArr[0]
    updatedSecondColArr[0] = 0
    elements.score += updatedFirstColArr[0]

  }


  const ColumnAfterCombiningSecondCol = [updatedSecondColArr[0], updatedSecondColArr[1], updatedSecondColArr[2], updatedSecondColArr[3]]
  const secondColPostCombineFilter = ColumnAfterCombiningSecondCol.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondColPostCombineFilter.length

  const finalSortedAndCombinedSecondCol = [...new Array(missingIndexesInArray).fill(0), ...secondColPostCombineFilter]

  elements.cells[1].innerHTML = finalSortedAndCombinedSecondCol[0]
  elements.cells[1 + elements.width].innerHTML = finalSortedAndCombinedSecondCol[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = finalSortedAndCombinedSecondCol[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = finalSortedAndCombinedSecondCol[3]
  //END OF COMBINE 2ND COL

  const thirdCol = thirdColumn.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdCol.length

  const updatedThirdColArr = [...new Array(missingIndexesInArray).fill(0), ...thirdCol]
  elements.cells[2].innerHTML = updatedThirdColArr[0]
  elements.cells[2 + elements.width].innerHTML = updatedThirdColArr[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = updatedThirdColArr[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = updatedThirdColArr[3]


  //THIRD COL COMBINER 

  if (updatedThirdColArr[3] === updatedThirdColArr[2]) {
    updatedThirdColArr[3] = updatedThirdColArr[3] + updatedThirdColArr[2]
    updatedThirdColArr[2] = 0
    elements.score += updatedFirstColArr[3]

  }

  if (updatedThirdColArr[2] === updatedThirdColArr[1]) {
    updatedThirdColArr[2] = updatedThirdColArr[2] + updatedThirdColArr[1]
    updatedThirdColArr[1] = 0
    elements.score += updatedFirstColArr[2]

  }

  if (updatedThirdColArr[1] === updatedThirdColArr[0]) {
    updatedThirdColArr[1] = updatedThirdColArr[1] + updatedThirdColArr[0]
    updatedThirdColArr[0] = 0
    elements.score += updatedFirstColArr[1]

  }

  const ColumnAfterCombiningThirdCol = [updatedThirdColArr[0], updatedThirdColArr[1], updatedThirdColArr[2], updatedThirdColArr[3]]

  const thirdColPostCombineFilter = ColumnAfterCombiningThirdCol.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdColPostCombineFilter.length

  const finalSortedAndCombinedThirdCol = [...new Array(missingIndexesInArray).fill(0), ...thirdColPostCombineFilter]

  elements.cells[2].innerHTML = finalSortedAndCombinedThirdCol[0]
  elements.cells[2 + elements.width].innerHTML = finalSortedAndCombinedThirdCol[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = finalSortedAndCombinedThirdCol[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = finalSortedAndCombinedThirdCol[3]

  //END OF COMBINE 3rd COL

  const fourthCol = fourthColumn.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...new Array(missingIndexesInArray).fill(0), ...fourthCol]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]


  //COMBINING CALCULATION -- COL 4

  if (updatedFourthColArr[3] === updatedFourthColArr[2]) {
    updatedFourthColArr[3] = updatedFourthColArr[3] + updatedFourthColArr[2]
    updatedFourthColArr[2] = 0
    elements.score += updatedFirstColArr[3]

  }

  if (updatedFourthColArr[2] === updatedFourthColArr[1]) {
    updatedFourthColArr[2] = updatedFourthColArr[2] + updatedFourthColArr[1]
    updatedFourthColArr[1] = 0
    elements.score += updatedFirstColArr[2]


  }

  if (updatedFourthColArr[1] === updatedFourthColArr[0]) {
    updatedFourthColArr[1] = updatedFourthColArr[1] + updatedFourthColArr[0]
    updatedFourthColArr[0] = 0
    elements.score += updatedFirstColArr[1]


  }


  const ColumnAfterCombining = [updatedFourthColArr[0], updatedFourthColArr[1], updatedFourthColArr[2], updatedFourthColArr[3]]

  const fourthColPostCombineFilter = ColumnAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthColPostCombineFilter.length

  const FinalSortedAndCombinedCol = [...new Array(missingIndexesInArray).fill(0), ...fourthColPostCombineFilter]

  elements.cells[3].innerHTML = FinalSortedAndCombinedCol[0]
  elements.cells[3 + elements.width].innerHTML = FinalSortedAndCombinedCol[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedCol[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedCol[3]
  //END OF COMBINING CALCULATOR 

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })

}



function moveGridsUpwards() {

  // first column 
  const firstColumn = []
  for (let i = 0; i < elements.width ** 2; i += elements.width) {
    firstColumn.push(Number(elements.cells[i].innerHTML))
  }

  // second column 
  const secondColumn = []
  for (let i = 1; i < elements.width ** 2; i += elements.width) {
    secondColumn.push(Number(elements.cells[i].innerHTML))
  }

  // third column 
  const thirdColumn = []
  for (let i = 2; i < elements.width ** 2; i += elements.width) {
    thirdColumn.push(Number(elements.cells[i].innerHTML))
  }

  // fourth column 
  const fourthColumn = []
  for (let i = 3; i < elements.width ** 2; i += elements.width) {
    fourthColumn.push(Number(elements.cells[i].innerHTML))
  }

  const firstCol = firstColumn.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstCol.length
  const updatedFirstColArr = [...firstCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstColArr[0]
  elements.cells[elements.width].innerHTML = updatedFirstColArr[1]
  elements.cells[elements.width * 2].innerHTML = updatedFirstColArr[2]
  elements.cells[elements.width * 3].innerHTML = updatedFirstColArr[3]

  //COMBINER FOR COL 2
  if (updatedFirstColArr[1] === updatedFirstColArr[0]) {
    updatedFirstColArr[0] = updatedFirstColArr[1] + updatedFirstColArr[0]
    updatedFirstColArr[1] = 0
    elements.score += updatedFirstColArr[0]
  }
  if (updatedFirstColArr[2] === updatedFirstColArr[1]) {
    updatedFirstColArr[1] = updatedFirstColArr[2] + updatedFirstColArr[1]
    updatedFirstColArr[2] = 0
    elements.score += updatedFirstColArr[1]
  }
  if (updatedFirstColArr[3] === updatedFirstColArr[2]) {
    updatedFirstColArr[2] = updatedFirstColArr[3] + updatedFirstColArr[2]
    updatedFirstColArr[3] = 0
    elements.score += updatedFirstColArr[2]
  }

  const ColumnAfterCombiningFirstCol = [updatedFirstColArr[0], updatedFirstColArr[1], updatedFirstColArr[2], updatedFirstColArr[3]]

  const firstColPostCombineFilter = ColumnAfterCombiningFirstCol.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - firstColPostCombineFilter.length

  const FinalSortedAndCombinedFirstCol = [...firstColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstCol[0]
  elements.cells[0 + elements.width].innerHTML = FinalSortedAndCombinedFirstCol[1]
  elements.cells[0 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedFirstCol[2]
  elements.cells[0 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedFirstCol[3]

  //END OF 1st COMBINER 
  const secondCol = secondColumn.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...secondCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]

  //COMBINER FOR COL 2
  if (updatedSecondColArr[1] === updatedSecondColArr[0]) {
    updatedSecondColArr[0] = updatedSecondColArr[1] + updatedSecondColArr[0]
    updatedSecondColArr[1] = 0
  }

  if (updatedSecondColArr[2] === updatedSecondColArr[1]) {
    updatedSecondColArr[1] = updatedSecondColArr[2] + updatedSecondColArr[1]
    updatedSecondColArr[2] = 0
  }

  if (updatedSecondColArr[3] === updatedSecondColArr[2]) {
    updatedSecondColArr[2] = updatedSecondColArr[3] + updatedSecondColArr[2]
    updatedSecondColArr[3] = 0
  }

  const ColumnAfterCombiningSecondCol = [updatedSecondColArr[0], updatedSecondColArr[1], updatedSecondColArr[2], updatedSecondColArr[3]]

  const secondColPostCombineFilter = ColumnAfterCombiningSecondCol.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondColPostCombineFilter.length

  const FinalSortedAndCombinedSecondCol = [...secondColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[1].innerHTML = FinalSortedAndCombinedSecondCol[0]
  elements.cells[1 + elements.width].innerHTML = FinalSortedAndCombinedSecondCol[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedSecondCol[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedSecondCol[3]

  //END OF 2ND COMBINER 

  //create updated arr and assign elements down -- 3rd COLUMN
  const thirdCol = thirdColumn.filter((numb) => {
    return numb
  })
  missingIndexesInArray = 4 - thirdCol.length

  const updatedThirdColArr = [...thirdCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[2].innerHTML = updatedThirdColArr[0]
  elements.cells[2 + elements.width].innerHTML = updatedThirdColArr[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = updatedThirdColArr[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = updatedThirdColArr[3]


  //COMBINER FOR COL 3
  if (updatedThirdColArr[1] === updatedThirdColArr[0]) {
    updatedThirdColArr[0] = updatedThirdColArr[1] + updatedThirdColArr[0]
    updatedThirdColArr[1] = 0
  }

  if (updatedThirdColArr[2] === updatedThirdColArr[1]) {
    updatedThirdColArr[1] = updatedThirdColArr[2] + updatedThirdColArr[1]
    updatedThirdColArr[2] = 0
  }

  if (updatedThirdColArr[3] === updatedThirdColArr[2]) {
    updatedThirdColArr[2] = updatedThirdColArr[3] + updatedThirdColArr[2]
    updatedThirdColArr[3] = 0
  }

  const ColumnAfterCombining = [updatedThirdColArr[0], updatedThirdColArr[1], updatedThirdColArr[2], updatedThirdColArr[3]]
  const thirdColPostCombineFilter = ColumnAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdColPostCombineFilter.length

  const FinalSortedAndCombinedThirdCol = [...thirdColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[2].innerHTML = FinalSortedAndCombinedThirdCol[0]
  elements.cells[2 + elements.width].innerHTML = FinalSortedAndCombinedThirdCol[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedThirdCol[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedThirdCol[3]

  //END OF 3RD COMBINER 
  const fourthCol = fourthColumn.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...fourthCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]


  //ADDING CODE FOR THE COMBINING CALCULATION -- COL 4
  if (updatedFourthColArr[1] === updatedFourthColArr[0]) {
    updatedFourthColArr[0] = updatedFourthColArr[1] + updatedFourthColArr[0]
    updatedFourthColArr[1] = 0
  }

  if (updatedFourthColArr[2] === updatedFourthColArr[1]) {
    updatedFourthColArr[1] = updatedFourthColArr[2] + updatedFourthColArr[1]
    updatedFourthColArr[2] = 0
  }

  if (updatedFourthColArr[3] === updatedFourthColArr[2]) {
    updatedFourthColArr[2] = updatedFourthColArr[3] + updatedFourthColArr[2]
    updatedFourthColArr[3] = 0
  }

  const ColumnAfterCombiningForFourth = [updatedFourthColArr[0], updatedFourthColArr[1], updatedFourthColArr[2], updatedFourthColArr[3]]

  const fourthColPostCombineFilter = ColumnAfterCombiningForFourth.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthColPostCombineFilter.length

  const FinalSortedAndCombinedCol = [...fourthColPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[3].innerHTML = FinalSortedAndCombinedCol[0]
  elements.cells[3 + elements.width].innerHTML = FinalSortedAndCombinedCol[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = FinalSortedAndCombinedCol[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = FinalSortedAndCombinedCol[3]

  //END OF COMBINING CALCULATOR 

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })

}

function moveGridsLeft() {
  // first column 
  const firstRow = []
  for (let i = 0; i < elements.width; i++) {
    firstRow.push(Number(elements.cells[i].innerHTML))
  }

  // second column 
  const secondRow = []
  for (let i = 4; i < elements.width * 2; i++) {
    secondRow.push(Number(elements.cells[i].innerHTML))
  }

  // third column 
  const thirdRow = []
  for (let i = 8; i < elements.width * 3; i++) {
    thirdRow.push(Number(elements.cells[i].innerHTML))
  }

  // fourth column 
  const fourthRow = []
  for (let i = 12; i < elements.width ** 2; i++) {
    fourthRow.push(Number(elements.cells[i].innerHTML))
  }

  //First row
  const firstRowUpdated = firstRow.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...firstRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  //COMBINER FOR FIRST ROW LEFT
  if (updatedFirstRowArr[1] === updatedFirstRowArr[0]) {
    updatedFirstRowArr[0] = updatedFirstRowArr[1] + updatedFirstRowArr[0]
    updatedFirstRowArr[1] = 0
  }

  if (updatedFirstRowArr[2] === updatedFirstRowArr[1]) {
    updatedFirstRowArr[1] = updatedFirstRowArr[2] + updatedFirstRowArr[1]
    updatedFirstRowArr[2] = 0
  }

  if (updatedFirstRowArr[3] === updatedFirstRowArr[2]) {
    updatedFirstRowArr[2] = updatedFirstRowArr[3] + updatedFirstRowArr[2]
    updatedFirstRowArr[3] = 0
  }

  const firstRowAfterCombining = [updatedFirstRowArr[0], updatedFirstRowArr[1], updatedFirstRowArr[2], updatedFirstRowArr[3]]

  const firstRowPostCombineFilter = firstRowAfterCombining.filter((numb) => {
    return numb
  })
  missingIndexesInArray = 4 - firstRowPostCombineFilter.length

  const FinalSortedAndCombinedFirstRow = [...firstRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstRow[0]
  elements.cells[1].innerHTML = FinalSortedAndCombinedFirstRow[1]
  elements.cells[2].innerHTML = FinalSortedAndCombinedFirstRow[2]
  elements.cells[3].innerHTML = FinalSortedAndCombinedFirstRow[3]

  //END OF COMBINING CALCULATOR 
  const secondRowUpdated = secondRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...secondRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]

  //COMBINER FOR 2nd ROW 
  if (updatedSecondRowArr[1] === updatedSecondRowArr[0]) {
    updatedSecondRowArr[0] = updatedSecondRowArr[1] + updatedSecondRowArr[0]
    updatedSecondRowArr[1] = 0
  }

  if (updatedSecondRowArr[2] === updatedSecondRowArr[1]) {
    updatedSecondRowArr[1] = updatedSecondRowArr[2] + updatedSecondRowArr[1]
    updatedSecondRowArr[2] = 0
  }

  if (updatedSecondRowArr[3] === updatedSecondRowArr[2]) {
    updatedSecondRowArr[2] = updatedSecondRowArr[3] + updatedSecondRowArr[2]
    updatedSecondRowArr[3] = 0
  }

  const secondRowAfterCombining = [updatedSecondRowArr[0], updatedSecondRowArr[1], updatedSecondRowArr[2], updatedSecondRowArr[3]]
  const secondRowPostCombineFilter = secondRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondRowPostCombineFilter.length
  const FinalSortedAndCombinedSecondRow = [...secondRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[4].innerHTML = FinalSortedAndCombinedSecondRow[0]
  elements.cells[5].innerHTML = FinalSortedAndCombinedSecondRow[1]
  elements.cells[6].innerHTML = FinalSortedAndCombinedSecondRow[2]
  elements.cells[7].innerHTML = FinalSortedAndCombinedSecondRow[3]

  //END OF COMBINING CALCULATOR -2ND ROW
  const thirdRowUpdated = thirdRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...thirdRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]

  //COMBINER FOR 3rd ROW 
  if (updatedThirdRowArr[1] === updatedThirdRowArr[0]) {
    updatedThirdRowArr[0] = updatedThirdRowArr[1] + updatedThirdRowArr[0]
    updatedThirdRowArr[1] = 0
  }

  if (updatedThirdRowArr[2] === updatedThirdRowArr[1]) {
    updatedThirdRowArr[1] = updatedThirdRowArr[2] + updatedThirdRowArr[1]
    updatedThirdRowArr[2] = 0
  }

  if (updatedThirdRowArr[3] === updatedThirdRowArr[2]) {
    updatedThirdRowArr[2] = updatedThirdRowArr[3] + updatedThirdRowArr[2]
    updatedThirdRowArr[3] = 0
  }
  const thirdRowAfterCombining = [updatedThirdRowArr[0], updatedThirdRowArr[1], updatedThirdRowArr[2], updatedThirdRowArr[3]]

  const thirdRowPostCombineFilter = thirdRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdRowPostCombineFilter.length
  const FinalSortedAndCombinedThirdRow = [...thirdRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[8].innerHTML = FinalSortedAndCombinedThirdRow[0]
  elements.cells[9].innerHTML = FinalSortedAndCombinedThirdRow[1]
  elements.cells[10].innerHTML = FinalSortedAndCombinedThirdRow[2]
  elements.cells[11].innerHTML = FinalSortedAndCombinedThirdRow[3]

  //END OF COMBINING CALCULATOR -3rd ROW

  const fourthRowUpdated = fourthRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...fourthRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  //COMBINER FOR 4th ROW 
  if (updatedFourthRowArr[1] === updatedFourthRowArr[0]) {
    updatedFourthRowArr[0] = updatedFourthRowArr[1] + updatedFourthRowArr[0]
    updatedFourthRowArr[1] = 0
  }

  if (updatedFourthRowArr[2] === updatedFourthRowArr[1]) {
    updatedFourthRowArr[1] = updatedFourthRowArr[2] + updatedFourthRowArr[1]
    updatedFourthRowArr[2] = 0
  }

  if (updatedFourthRowArr[3] === updatedFourthRowArr[2]) {
    updatedFourthRowArr[2] = updatedFourthRowArr[3] + updatedFourthRowArr[2]
    updatedFourthRowArr[3] = 0
  }

  const fourthRowAfterCombining = [updatedFourthRowArr[0], updatedFourthRowArr[1], updatedFourthRowArr[2], updatedFourthRowArr[3]]

  const fourthRowPostCombineFilter = fourthRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthRowPostCombineFilter.length

  const FinalSortedAndCombinedFourthRow = [...fourthRowPostCombineFilter, ...new Array(missingIndexesInArray).fill(0)]

  elements.cells[12].innerHTML = FinalSortedAndCombinedFourthRow[0]
  elements.cells[13].innerHTML = FinalSortedAndCombinedFourthRow[1]
  elements.cells[14].innerHTML = FinalSortedAndCombinedFourthRow[2]
  elements.cells[15].innerHTML = FinalSortedAndCombinedFourthRow[3]

  //END OF COMBINING CALCULATOR -4th ROW

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
}

function moveGridsRight() {

  // first column 
  const firstRow = []
  for (let i = 0; i < elements.width; i++) {
    firstRow.push(Number(elements.cells[i].innerHTML))
  }

  // second column 
  const secondRow = []
  for (let i = 4; i < elements.width * 2; i++) {
    secondRow.push(Number(elements.cells[i].innerHTML))
  }

  // third column 
  const thirdRow = []
  for (let i = 8; i < elements.width * 3; i++) {
    thirdRow.push(Number(elements.cells[i].innerHTML))
  }

  // fourth column 
  const fourthRow = []
  for (let i = 12; i < elements.width ** 2; i++) {
    fourthRow.push(Number(elements.cells[i].innerHTML))
  }

  const firstRowUpdated = firstRow.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...new Array(missingIndexesInArray).fill(0), ...firstRowUpdated]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  //COMBINER FOR FIRST ROW 
  if (updatedFirstRowArr[3] === updatedFirstRowArr[2]) {
    updatedFirstRowArr[3] = updatedFirstRowArr[3] + updatedFirstRowArr[2]
    updatedFirstRowArr[2] = 0
  }

  if (updatedFirstRowArr[2] === updatedFirstRowArr[1]) {
    updatedFirstRowArr[2] = updatedFirstRowArr[2] + updatedFirstRowArr[1]
    updatedFirstRowArr[1] = 0
  }

  if (updatedFirstRowArr[1] === updatedFirstRowArr[0]) {
    updatedFirstRowArr[1] = updatedFirstRowArr[1] + updatedFirstRowArr[0]
    updatedFirstRowArr[0] = 0

  }

  const firstRowAfterCombining = [updatedFirstRowArr[0], updatedFirstRowArr[1], updatedFirstRowArr[2], updatedFirstRowArr[3]]

  const firstRowPostCombineFilter = firstRowAfterCombining.filter((numb) => {
    return numb
  })

  //eg 2 
  missingIndexesInArray = 4 - firstRowPostCombineFilter.length

  const FinalSortedAndCombinedFirstRow = [...new Array(missingIndexesInArray).fill(0), ...firstRowPostCombineFilter]
  elements.cells[0].innerHTML = FinalSortedAndCombinedFirstRow[0]
  elements.cells[1].innerHTML = FinalSortedAndCombinedFirstRow[1]
  elements.cells[2].innerHTML = FinalSortedAndCombinedFirstRow[2]
  elements.cells[3].innerHTML = FinalSortedAndCombinedFirstRow[3]

  //END OF COMBINING CALCULATOR

  const secondRowUpdated = secondRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...new Array(missingIndexesInArray).fill(0), ...secondRowUpdated]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]

  //COMBINER FOR 2nd ROW 
  if (updatedSecondRowArr[3] === updatedSecondRowArr[2]) {
    updatedSecondRowArr[3] = updatedSecondRowArr[3] + updatedSecondRowArr[2]
    updatedSecondRowArr[2] = 0
  }

  if (updatedSecondRowArr[2] === updatedSecondRowArr[1]) {
    updatedSecondRowArr[2] = updatedSecondRowArr[2] + updatedSecondRowArr[1]
    updatedSecondRowArr[1] = 0
  }

  if (updatedSecondRowArr[1] === updatedSecondRowArr[0]) {
    updatedSecondRowArr[1] = updatedSecondRowArr[1] + updatedSecondRowArr[0]
    updatedSecondRowArr[0] = 0
  }

  const secondRowAfterCombining = [updatedSecondRowArr[0], updatedSecondRowArr[1], updatedSecondRowArr[2], updatedSecondRowArr[3]]

  const secondRowPostCombineFilter = secondRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondRowPostCombineFilter.length
  const FinalSortedAndCombinedSecondRow = [...new Array(missingIndexesInArray).fill(0), ...secondRowPostCombineFilter]

  elements.cells[4].innerHTML = FinalSortedAndCombinedSecondRow[0]
  elements.cells[5].innerHTML = FinalSortedAndCombinedSecondRow[1]
  elements.cells[6].innerHTML = FinalSortedAndCombinedSecondRow[2]
  elements.cells[7].innerHTML = FinalSortedAndCombinedSecondRow[3]
  //END OF COMBINING CALCULATOR -2ND ROW 

  const thirdRowUpdated = thirdRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...new Array(missingIndexesInArray).fill(0), ...thirdRowUpdated]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]



  //COMBINER FOR 3rd ROW 
  if (updatedThirdRowArr[3] === updatedThirdRowArr[2]) {
    updatedThirdRowArr[3] = updatedThirdRowArr[3] + updatedThirdRowArr[2]
    updatedThirdRowArr[2] = 0
  }

  if (updatedThirdRowArr[2] === updatedThirdRowArr[1]) {
    updatedThirdRowArr[2] = updatedThirdRowArr[2] + updatedThirdRowArr[1]
    updatedThirdRowArr[1] = 0
  }

  if (updatedThirdRowArr[1] === updatedThirdRowArr[0]) {
    updatedThirdRowArr[1] = updatedThirdRowArr[1] + updatedThirdRowArr[0]
    updatedThirdRowArr[0] = 0
  }

  const thirdRowAfterCombining = [updatedThirdRowArr[0], updatedThirdRowArr[1], updatedThirdRowArr[2], updatedThirdRowArr[3]]

  const thirdRowPostCombineFilter = thirdRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - thirdRowPostCombineFilter.length

  const FinalSortedAndCombinedThirdRow = [...new Array(missingIndexesInArray).fill(0), ...thirdRowPostCombineFilter]

  elements.cells[8].innerHTML = FinalSortedAndCombinedThirdRow[0]
  elements.cells[9].innerHTML = FinalSortedAndCombinedThirdRow[1]
  elements.cells[10].innerHTML = FinalSortedAndCombinedThirdRow[2]
  elements.cells[11].innerHTML = FinalSortedAndCombinedThirdRow[3]

  //END OF COMBINING CALCULATOR -3rd ROW
  const fourthRowUpdated = fourthRow.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...new Array(missingIndexesInArray).fill(0), ...fourthRowUpdated]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  //COMBINER FOR 4th ROW 

  if (updatedFourthRowArr[3] === updatedFourthRowArr[2]) {
    updatedFourthRowArr[3] = updatedFourthRowArr[3] + updatedFourthRowArr[2]
    updatedFourthRowArr[2] = 0
  }


  if (updatedFourthRowArr[2] === updatedFourthRowArr[1]) {
    updatedFourthRowArr[2] = updatedFourthRowArr[2] + updatedFourthRowArr[1]
    updatedFourthRowArr[1] = 0
  }

  if (updatedFourthRowArr[1] === updatedFourthRowArr[0]) {
    updatedFourthRowArr[1] = updatedFourthRowArr[1] + updatedFourthRowArr[0]
    updatedFourthRowArr[0] = 0
  }

  const fourthRowAfterCombining = [updatedFourthRowArr[0], updatedFourthRowArr[1], updatedFourthRowArr[2], updatedFourthRowArr[3]]
  const fourthRowPostCombineFilter = fourthRowAfterCombining.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - fourthRowPostCombineFilter.length

  const FinalSortedAndCombinedFourthRow = [...new Array(missingIndexesInArray).fill(0), ...fourthRowPostCombineFilter]
  elements.cells[12].innerHTML = FinalSortedAndCombinedFourthRow[0]
  elements.cells[13].innerHTML = FinalSortedAndCombinedFourthRow[1]
  elements.cells[14].innerHTML = FinalSortedAndCombinedFourthRow[2]
  elements.cells[15].innerHTML = FinalSortedAndCombinedFourthRow[3]

  //END OF COMBINING CALCULATOR -4th ROW

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
}

function gameOver() {
  alert('GAME OVER')
}