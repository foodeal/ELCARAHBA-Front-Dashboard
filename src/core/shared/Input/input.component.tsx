import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import styles from './input.module.scss';

export declare type InputType =
  | 'password'
  | 'number'
  | 'search'
  | 'email'
  | 'text'
  | 'url'
  | 'date'
  | 'file'
  | 'select';
declare type InputSize = 'medium' | 'small' | undefined;

interface InputProps {
  meta: FieldMetaState<any>;
  input: FieldInputProps<any, any>;
  disabled?: boolean;
  initialValue? : string;
  placeholder?: string;
  ref?: any;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  value?: string;
  helperText?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  icon?: React.ReactNode;
  handleAction?(event): void;
  onClick?(event): void;
  onFocus?(event): void;
  onBlur?(event): void;
  onChangeValue?(event): void;
  darkTheme?: boolean;
}

/**
 * Component Input
 *
 * @component
 *
 * @example
 * return (
 *   <Input />
 * )
 */
export function Input({
  meta,
  input,
  disabled,
  placeholder,
  required,
  multiline,
  initialValue,
  ref,
  value,
  defaultValue,
  helperText,
  type,
  size,
  className,
  icon,
  onFocus,
  onBlur,
  onClick,
  handleAction,
  onChangeValue,
  darkTheme = true
}: InputProps): JSX.Element {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    var value = event.target.value;
    if (!value) {
      var value = event.target.defaultValue;
    }
    input.onChange(value);
    // console.log(value);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    var value = event.target;
    if (!value && defaultValue) {
      var value = event.target;
    }
    input.onChange(value);
    // console.log(value);
  };

  // console.log(type);

  return (
    <TextField
      {...input}
      InputProps={
        icon
          ? {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label='input icon' onClick={handleAction}>
                    {icon}
                  </IconButton>
                </InputAdornment>
              )
            }
          : undefined
      }
      InputLabelProps={{
        shrink: true,
        classes: {
          root: styles.formLabelRoot,
          focused: styles.formLabelFocused
        }
      }}
      ref={ref}
      defaultValue={initialValue}
      value={value}
      className={`${
        darkTheme ? styles.custom_input : styles.custom_input_light
      } ${className}`}
      id={input.name + '-' + placeholder}
      placeholder={placeholder || ''}
      required={required}
      disabled={disabled}
      fullWidth={true}
      type={type}
      helperText={
        meta?.touched &&
        !!meta?.error && (
          <span
            style={{
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {meta?.error || helperText}
          </span>
        )
      }
      onFocus={onFocus}
      onBlur={onBlur}
      error={meta?.touched && !!meta?.error}
      size={size || 'small'}
      onChange={handleChange}
      // onClick={handleClick}


      sx={{ '& input': { border: 'unset!important' } }}
    />
  );
}
