import React from "react";
import { FormIdEnum } from "@core/enums";
import { Form as FormFinal } from "react-final-form";

interface FormProps {
  formId: FormIdEnum;
  children: React.ReactNode;
  className?: string;
  initialValues: any;
  onSubmit: (data: any) => void;
  validate?: (data: any) => any;
}

export const Form = (props: FormProps) => {
  return (
    <FormFinal
      initialValues={props.initialValues}
      onSubmit={(props.onSubmit)}
      id={props.formId}
      validate={props.validate}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>{props.children}</form>
      )}
    </FormFinal>
  );
};
