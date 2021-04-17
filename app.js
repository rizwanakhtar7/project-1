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
  //generate random number 2 or 4 from array
  const twoOrFourArr = [2, 4]
  const randomIdx = Math.floor(Math.random() * twoOrFourArr.length)
  const twoOrFourNumber = twoOrFourArr[randomIdx]


  let randomNumberOnGrid = Math.floor(Math.random() * (width ** 2))


  if (elements.cells[randomNumberOnGrid].className === '') {
    elements.cells[randomNumberOnGrid].className = 'Number'
    elements.cells[randomNumberOnGrid].innerHTML = twoOrFourNumber
  } else if (elements.cells[randomNumberOnGrid].classList.contains('Number')) {
    //TEST SECOND CONDITION 

    randomNumberOnGrid = Math.floor(Math.random() * (width ** 2))
    elements.cells[randomNumberOnGrid].className = 'Number'
    elements.cells[randomNumberOnGrid].innerHTML = twoOrFourNumber
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



  //create updated arr and assign elements down -- 1st COLUMN

  const firstCol = firstColumn.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstCol.length
  const updatedFirstColArr = [...new Array(missingIndexesInArray).fill(0), ...firstCol]
  elements.cells[0].innerHTML = updatedFirstColArr[0]
  elements.cells[elements.width].innerHTML = updatedFirstColArr[1]
  elements.cells[elements.width * 2].innerHTML = updatedFirstColArr[2]
  elements.cells[elements.width * 3].innerHTML = updatedFirstColArr[3]

  //create updated arr and assign elements down -- 2nd COLUMN

  const secondCol = secondColumn.filter((numb) => {
    return numb
  })

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...new Array(missingIndexesInArray).fill(0), ...secondCol]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]


  //create updated arr and assign elements down -- 3rd COLUMN

  const thirdCol = thirdColumn.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - thirdCol.length

  const updatedThirdColArr = [...new Array(missingIndexesInArray).fill(0), ...thirdCol]
  elements.cells[2].innerHTML = updatedThirdColArr[0]
  elements.cells[2 + elements.width].innerHTML = updatedThirdColArr[1]
  elements.cells[2 + (elements.width * 2)].innerHTML = updatedThirdColArr[2]
  elements.cells[2 + (elements.width * 3)].innerHTML = updatedThirdColArr[3]

  //create updated arr and assign elements down -- 3rd COLUMN

  const fourthCol = fourthColumn.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...new Array(missingIndexesInArray).fill(0), ...fourthCol]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]


  //ADDING CODE FOR THE COMBINING CALCULATION
  //which are the same EG 2 2 2 2 --> 0 0 4 4 then random --> 2 0 4 4 
  //0 2 0 2 --> 0 0 2 2 --> EXPECT --> 0 0 0 4
  //0 0 2 4 
  // console.log(updatedFirstColArr)
  // if (updatedFourthColArr[3] === updatedFourthColArr[2]) {
  //   updatedFourthColArr[3] = updatedFourthColArr[3] + updatedFourthColArr[2]
  // }

  // if (updatedFourthColArr[2] === updatedFourthColArr[1]) {
  //   updatedFourthColArr[2] = updatedFourthColArr[2] + updatedFourthColArr[1]
  // }

  // if (updatedFourthColArr[1] === updatedFourthColArr[0]) {
  //   updatedFourthColArr[1] = updatedFourthColArr[1] + updatedFourthColArr[0]
  // }
  // console.log(updatedFourthColArr[0])
  // console.log(updatedFourthColArr[1])
  // console.log(updatedFourthColArr[2])
  // console.log(updatedFourthColArr[3])



  //if(updatedFourthColArr.length -1 )

  //col 2 


  //col 3


  //col 4 









  //END OF COMBINING CALCULATOR 


  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
  //MAKE ABOVE MORE DYNAMIC 
  // for (let i = 0; i < elements.width ** 2; i += elements.width) {
  //   let idxOfUpdatedColumn = 0
  //   elements.cells[i].innerHTML = updatedFirstColArr[idxOfUpdatedColumn]
  //   ++idxOfUpdatedColumn
  // }


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



  //create updated arr and assign elements down -- 1st COLUMN

  const firstCol = firstColumn.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstCol.length
  const updatedFirstColArr = [...firstCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstColArr[0]
  elements.cells[elements.width].innerHTML = updatedFirstColArr[1]
  elements.cells[elements.width * 2].innerHTML = updatedFirstColArr[2]
  elements.cells[elements.width * 3].innerHTML = updatedFirstColArr[3]

  //create updated arr and assign elements down -- 2nd COLUMN

  const secondCol = secondColumn.filter((numb) => {
    return numb
  })

  console.log(secondCol)

  missingIndexesInArray = 4 - secondCol.length

  const updatedSecondColArr = [...secondCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[1].innerHTML = updatedSecondColArr[0]
  elements.cells[1 + elements.width].innerHTML = updatedSecondColArr[1]
  elements.cells[1 + (elements.width * 2)].innerHTML = updatedSecondColArr[2]
  elements.cells[1 + (elements.width * 3)].innerHTML = updatedSecondColArr[3]


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

  //create updated arr and assign elements down -- 3rd COLUMN

  const fourthCol = fourthColumn.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - fourthCol.length

  const updatedFourthColArr = [...fourthCol, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[3].innerHTML = updatedFourthColArr[0]
  elements.cells[3 + elements.width].innerHTML = updatedFourthColArr[1]
  elements.cells[3 + (elements.width * 2)].innerHTML = updatedFourthColArr[2]
  elements.cells[3 + (elements.width * 3)].innerHTML = updatedFourthColArr[3]

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
  //MAKE ABOVE MORE DYNAMIC 
  // for (let i = 0; i < elements.width ** 2; i += elements.width) {
  //   let idxOfUpdatedColumn = 0
  //   elements.cells[i].innerHTML = updatedFirstColArr[idxOfUpdatedColumn]
  //   ++idxOfUpdatedColumn
  // }

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



  //create updated arr and assign elements down -- 1st COLUMN

  const firstRowUpdated = firstRow.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...firstRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  //create updated arr and assign elements down -- 2nd COLUMN

  const secondRowUpdated = secondRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...secondRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]


  //create updated arr and assign elements down -- 3rd COLUMN

  const thirdRowUpdated = thirdRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...thirdRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]

  //create updated arr and assign elements down -- 3rd COLUMN

  const fourthRowUpdated = fourthRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...fourthRowUpdated, ...new Array(missingIndexesInArray).fill(0)]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
  //MAKE ABOVE MORE DYNAMIC 
  // for (let i = 0; i < elements.width ** 2; i += elements.width) {
  //   let idxOfUpdatedColumn = 0
  //   elements.cells[i].innerHTML = updatedFirstColArr[idxOfUpdatedColumn]
  //   ++idxOfUpdatedColumn
  // }
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



  //create updated arr and assign elements down -- 1st COLUMN

  const firstRowUpdated = firstRow.filter((numb) => {
    return numb
  })

  let missingIndexesInArray = 4 - firstRowUpdated.length
  const updatedFirstRowArr = [...new Array(missingIndexesInArray).fill(0), ...firstRowUpdated]
  elements.cells[0].innerHTML = updatedFirstRowArr[0]
  elements.cells[1].innerHTML = updatedFirstRowArr[1]
  elements.cells[2].innerHTML = updatedFirstRowArr[2]
  elements.cells[3].innerHTML = updatedFirstRowArr[3]

  //create updated arr and assign elements down -- 2nd COLUMN

  const secondRowUpdated = secondRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - secondRowUpdated.length

  const updatedSecondRowArr = [...new Array(missingIndexesInArray).fill(0), ...secondRowUpdated]
  elements.cells[4].innerHTML = updatedSecondRowArr[0]
  elements.cells[5].innerHTML = updatedSecondRowArr[1]
  elements.cells[6].innerHTML = updatedSecondRowArr[2]
  elements.cells[7].innerHTML = updatedSecondRowArr[3]


  //create updated arr and assign elements down -- 3rd COLUMN

  const thirdRowUpdated = thirdRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - thirdRowUpdated.length

  const updatedThirdRowArr = [...new Array(missingIndexesInArray).fill(0), ...thirdRowUpdated]
  elements.cells[8].innerHTML = updatedThirdRowArr[0]
  elements.cells[9].innerHTML = updatedThirdRowArr[1]
  elements.cells[10].innerHTML = updatedThirdRowArr[2]
  elements.cells[11].innerHTML = updatedThirdRowArr[3]

  //create updated arr and assign elements down -- 3rd COLUMN

  const fourthRowUpdated = fourthRow.filter((numb) => {
    return numb
  })


  missingIndexesInArray = 4 - fourthRowUpdated.length

  const updatedFourthRowArr = [...new Array(missingIndexesInArray).fill(0), ...fourthRowUpdated]
  elements.cells[12].innerHTML = updatedFourthRowArr[0]
  elements.cells[13].innerHTML = updatedFourthRowArr[1]
  elements.cells[14].innerHTML = updatedFourthRowArr[2]
  elements.cells[15].innerHTML = updatedFourthRowArr[3]

  elements.cells.forEach((grid) => {
    grid.classList.add('Number')
    if (grid.innerHTML === '0') {
      grid.innerHTML = ''
    }
  })
  //MAKE ABOVE MORE DYNAMIC 
  // for (let i = 0; i < elements.width ** 2; i += elements.width) {
  //   let idxOfUpdatedColumn = 0
  //   elements.cells[i].innerHTML = updatedFirstColArr[idxOfUpdatedColumn]
  //   ++idxOfUpdatedColumn
  // }
}

//combine func 
//when user merges left right up down, should confirm calculations on the ROW
//OR the COLUMNS 

//EG DOWN WILL LOOK AT LAST TWO LINES AND DOUBLE CHECK COLUMNS - FILL IN WITH BLANKS
//DONE 
