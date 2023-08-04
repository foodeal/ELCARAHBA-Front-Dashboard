import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import styles from './search.module.scss';

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
  placeholder?: string;
  ref?: any;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  helperText?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  icon?: React.ReactNode;
  handleAction?(event): void;
  onChange(event): void;
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
export function InputSearch({
  meta,
  input,
  disabled,
  placeholder,
  required,
  ref,
  value,
  defaultValue,
  helperText,
  type,
  size,
  className,
  icon,
  handleAction,
  onChange,
  darkTheme = true
}: InputProps): JSX.Element {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
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
                  <IconButton aria-label='input icon' onClick={onChange}>
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
      defaultValue={defaultValue}
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
      onChange={onChange}
      error={meta?.touched && !!meta?.error}
      size={size || 'small'}
      sx={{ '& input': { border: 'unset!important' } }}
    />
  );
}
