// import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
// import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

// export const CustomersSearch = () => (
//   <Card sx={{ p: 2 }}>
//     <OutlinedInput
//       defaultValue=""
//       fullWidth
//       placeholder="Search customer"
//       startAdornment={(
//         <InputAdornment position="start">
//           <SvgIcon
//             color="action"
//             fontSize="small"
//           >
//             <MagnifyingGlassIcon />
//           </SvgIcon>
//         </InputAdornment>
//       )}
//       sx={{ maxWidth : 500 }}
//     />
//   </Card>
// );
import React, { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({  onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(searchQuery);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} 
        fullWidth
        placeholder="Chercher "
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
