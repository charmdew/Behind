import { Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react';
import { useContext } from 'react';

import { FilteredUsersDispatchContext } from '../pages/Home';

const PositionRadio = () => {
  const { setSelectedPosition } = useContext(FilteredUsersDispatchContext);

  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

  const getUsers = e => {
    setSelectedPosition(positionOptions.indexOf(e));
  };

  const positionOptions = ['전체', 'Backend', 'Frontend', 'Embedded'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'position',
    defaultValue: '전체',
    onChange: getUsers,
  });

  const positionGroup = getRootProps();

  return (
    <div>
      <HStack {...positionGroup}>
        {positionOptions.map(value => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </div>
  );
};

export default PositionRadio;
