import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Typography } from "@mui/material";

function valuetext(value) {
  return `${value}$`;
}

const minDistance = 1;

const RangeSlider = ({ setProductsState, products }) => {
  const [value, setValue] = React.useState([1, 100]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
      productsInRange();
    }
  };

  const productsInRange = () => {
    const newProducts = products.filter((product) => product.cost >= value[0] && product.cost <= value[1])
    setProductsState(newProducts);
  }

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom>
        Price range: {`${value[0]}$ - ${value[1]}$`}
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
};

export default RangeSlider;
