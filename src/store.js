import React, { useContext, useReducer } from "react";
import {
  amtOfWaterAllowedInOut,
  amtOfWaterIncreaseOnClick,
  capacityOfBucket,
  initialBuckets,
} from "./constants";

const BucketContext = React.createContext(null);
const DispatchContext = React.createContext(null);

export const ADD_WATER_BUFFER = "ADD_WATER_BUFFER";
export const ONE_SECOND_UP = "ONE_SECOND_UP";
export const EMPTY = "EMPTY";

const updateBucketAfterTimeUp = (bucketState) => {
  const newBucketState = [...bucketState];
  let total = 0;
  for (let i = 0; i < newBucketState.length; i++) {
    const currBucket = { ...newBucketState[i] };
    total += Number(currBucket.waterInBucket);
  }
  const equilibriumLevel = Number(total / initialBuckets.length).toFixed(2);

  const reductionNeeded = { count: 0, amt: 0 };
  const excessNeeded = { count: 0, amt: 0 };
  for (let i = 0; i < newBucketState.length; i++) {
    if (equilibriumLevel > newBucketState[i].waterInBucket) {
      excessNeeded.count += 1;
      excessNeeded.amt += Math.min(
        equilibriumLevel - newBucketState[i].waterInBucket,
        amtOfWaterAllowedInOut
      );
    } else if (equilibriumLevel < newBucketState[i].waterInBucket) {
      reductionNeeded.count += 1;
      reductionNeeded.amt += Math.min(
        -equilibriumLevel + newBucketState[i].waterInBucket,
        amtOfWaterAllowedInOut
      );
    }
  }

  const transferWater =
    reductionNeeded.amt > excessNeeded.amt ? excessNeeded : reductionNeeded;
  for (let i = 0; i < newBucketState.length; i++) {
    if (equilibriumLevel > newBucketState[i].waterInBucket) {
      newBucketState[i].waterInBucket += Number(
        transferWater.amt / excessNeeded.count
      );
    } else if (equilibriumLevel < newBucketState[i].waterInBucket) {
      newBucketState[i].waterInBucket -= Number(
        transferWater.amt / reductionNeeded.count
      );
    }
  }
  console.log("oldBucketsStatedBucketsState", newBucketState);

  for (let i = 0; i < newBucketState.length; i++) {
    if (
      newBucketState[i].waterInBuffer &&
      newBucketState[i].waterInBucket < capacityOfBucket
    ) {
      newBucketState[i].waterInBucket += Math.min(
        amtOfWaterIncreaseOnClick,
        newBucketState[i].waterInBuffer
      );
      newBucketState[i].waterInBuffer -= Math.min(
        amtOfWaterIncreaseOnClick,
        newBucketState[i].waterInBuffer
      );
    }
  }
  return newBucketState;
};

const bucketReducer = (prev, action) => {
  console.log("prev", prev);
  switch (action.type) {
    case ADD_WATER_BUFFER: {
      const newBuckets = [...prev];
      const idOfAffectedBucket = action.data.id;
      newBuckets[idOfAffectedBucket] = {
        ...newBuckets[idOfAffectedBucket],
        waterInBuffer:
          newBuckets[idOfAffectedBucket].waterInBuffer +
          amtOfWaterIncreaseOnClick,
      };
      return newBuckets;
    }
    case ONE_SECOND_UP:
      return updateBucketAfterTimeUp(prev);
    case EMPTY: {
      const newBuckets = [...prev];
      const idOfAffectedBucket = action.data.id;
      newBuckets[idOfAffectedBucket] = {
        ...newBuckets[idOfAffectedBucket],
        waterInBucket: 0,
      };
      return newBuckets;
    }
    default:
      return prev;
  }
};

export const useBucket = () => {
  return useContext(BucketContext);
};
export const useDispatch = () => {
  return useContext(DispatchContext);
};

const ContextProvider = ({ children }) => {
  const [buckets, dispatch] = useReducer(bucketReducer, initialBuckets);
  console.log("buckets", buckets);
  return (
    <BucketContext.Provider value={buckets}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </BucketContext.Provider>
  );
};
export default ContextProvider;
/**
 *
 * 200 0 0 0
 * 175  0 0
 * 150 25 25 0
 * 125 25 25 25
 * 100 50 25 25
 */
