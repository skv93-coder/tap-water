import React from "react";
import {
  ADD_WATER_BUFFER,
  EMPTY,
  ONE_SECOND_UP,
  useBucket,
  useDispatch,
} from "./store";
import Bucket from "./Bucket";
import Button from "./Button";
import { useTimeInertVal } from "./useTimeInterval";

export default function Watertank() {
  const buckets = useBucket();
  const dispatch = useDispatch();

  const handleAddBtnClick = (id) => {
    dispatch({
      type: ADD_WATER_BUFFER,
      data: { id },
    });
  };
  const handleRemoveBtnClick = (id) => {
    dispatch({ type: EMPTY, data: { id } });
  };
  const handleTimeUP = () => {
    dispatch({ type: ONE_SECOND_UP });
  };
  useTimeInertVal(handleTimeUP, 1000);
  return (
    <div className="water-tank">
      {buckets.map((bucket, i) => (
        <div style={{ flex: 1,display:'grid',placeItems:'center',marginTop:'12px' }}>
          <Bucket val={bucket.waterInBucket} />
          <div style={{ margin: "0 24px", display: "flex",justifyContent:'space-around' }}>
            <Button
              label="Add"
              handleClick={() => {
                handleAddBtnClick(i);
              }}
              className="btn-add"
            />
            <div style={{ marginLeft: "23px" }}>
              <Button
                label="Remove"
                handleClick={() => {
                  handleRemoveBtnClick(i);
                }}
                className="btn-remove"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
