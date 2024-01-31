/* eslint-disable react/jsx-max-props-per-line */
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

const CustomCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
          <Box marginLeft={1}>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">
          Date of Birth: {user.dateOfBirth}
        </Typography>
        <Typography variant="body1">
          Address: {user.address}, {user.city}, {user.country}
        </Typography>
        {/* Add any other user information you want to display */}
      </CardContent>
    </Card>
  );
};

export default CustomCard;

