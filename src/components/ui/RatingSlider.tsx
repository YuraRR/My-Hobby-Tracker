import { useSelector } from "react-redux";
import setRating from "../../firebase/setRating";
import Button from "./Button";
import { Slider } from "./shadcn/slider";
import { useState } from "react";
import { RootState } from "../../redux/app/store";

interface RatingSliderProps {
  itemId: number;
  type: string;
}

const RatingSlider = ({ itemId, type }: RatingSliderProps) => {
  const [value, setValue] = useState([5]);
  const currentUser = useSelector((state: RootState) => state.user);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
  };

  const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col relative w-64 px-3 py-5 items-end">
      <Slider defaultValue={[5]} max={10} step={1} value={value} title="Rate" onValueChange={handleValueChange} />
      <div className="w-full flex justify-between mt-2">
        {ratings.map((rating) => (
          <span key={rating} className="w-4 text-center">
            {rating}
          </span>
        ))}
      </div>

      <Button className="mt-3" onClick={() => setRating({ currentUser, itemId, type, userRating: value[0] })}>
        Make a rate
      </Button>
    </div>
  );
};

export default RatingSlider;
