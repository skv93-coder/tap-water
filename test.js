const amtOfWaterAllowedInOut = 25;
const updateBucketAfterTimeUp = (oldBucketsState) => {
  let total = 0;
  console.log("oldBucketsState", oldBucketsState);
  for (let i = 0; i < oldBucketsState.length; i++) {
    const currBucket = { ...oldBucketsState[i] };
    // currBucket.waterInBucket += Math.max(200, currBucket.waterInBuffer);
    // currBucket.waterInBuffer = Math.min(currBucket.waterInBuffer - 200, 0);
    total += Number(currBucket.waterInBucket);
  }
  const equilibriumLevel = Number(total / 4).toFixed(2);
  if (equilibriumLevel)
    console.log(
      "equilibriumLevel",
      { total, equilibriumLevel },
      oldBucketsState[1]
    );
  const reductionNeeded = { count: 0, amt: 0 };
  const excessNeeded = { count: 0, amt: 0 };
  for (let i = 0; i < oldBucketsState.length; i++) {
    // tanksNeedReduction[]
    if (equilibriumLevel > oldBucketsState[i].waterInBucket) {
      excessNeeded.count += 1;
      excessNeeded.amt += Math.min(
        equilibriumLevel - oldBucketsState[i].waterInBucket,
        amtOfWaterAllowedInOut
      );
    } else if (equilibriumLevel < oldBucketsState[i].waterInBucket) {
      reductionNeeded.count += 1;
      reductionNeeded.amt += Math.min(
        -equilibriumLevel + oldBucketsState[i].waterInBucket,
        amtOfWaterAllowedInOut
      );
    }
  }
  // if (excess.count === 0) {
  //   return;
  // }
  const transferWater =
    reductionNeeded.amt > excessNeeded.amt ? excessNeeded : reductionNeeded;
  console.log("transferWater", reductionNeeded, excessNeeded);
  for (let i = 0; i < oldBucketsState.length; i++) {
    if (equilibriumLevel > oldBucketsState[i].waterInBucket) {
      oldBucketsState[i].waterInBucket += Number(
        (transferWater.amt / excessNeeded.count)
      );
    } else if (equilibriumLevel < oldBucketsState[i].waterInBucket) {
      oldBucketsState[i].waterInBucket -= Number(
        (transferWater.amt / reductionNeeded.count)
      );
    }
  }
  console.log("oldBucketsStateoldBucketsState", oldBucketsState);

  for (let i = 0; i < oldBucketsState.length; i++) {
    if (oldBucketsState[i].waterInBuffer) {
      oldBucketsState[i].waterInBucket += Math.min(
        200,
        oldBucketsState[i].waterInBuffer
      );
      oldBucketsState[i].waterInBuffer -= Math.min(
        200,
        oldBucketsState[i].waterInBuffer
      );
    }
  }
  return oldBucketsState;
};

console.log(
  "first",
  updateBucketAfterTimeUp(  [
    { waterInBucket: 75, waterInBuffer: 0 },
    { waterInBucket: 41.66666666666667, waterInBuffer: 0 },
    { waterInBucket: 41.66666666666667, waterInBuffer: 0 },
    { waterInBucket: 41.66666666666667, waterInBuffer: 0 }
  ])
);
