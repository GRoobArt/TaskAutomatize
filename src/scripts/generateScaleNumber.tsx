export function generateScaleNumber(baseNumber: number): number[] {
  const scaleArray: number[] = []

  for (let i = 5; i <= 100; i += 5) {
    scaleArray.push(i)
  }

  // Asegúrate de que el último número sea el baseNumber
  if (!scaleArray.includes(baseNumber)) {
    scaleArray.push(baseNumber)
  }

  // Asegúrate de que el array comienza con 5
  if (scaleArray[0] !== 5) {
    scaleArray.unshift(5)
  }

  return scaleArray
}
