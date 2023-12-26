import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Card, CardContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomCardFooter from "../CardFooter";
import { FormFields, FormValidationRules } from "../../columns";
import CustomFormElements from "../CustomFormElements";
import { Action, CustomModalContext } from "../../contexts/CustomModalContext";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../redux/slice/userSlice";

export default function AddForm(props: any) {
  const { setLoading, loading } = props;
  const dispatch = useDispatch();
  const { closeModal, modalData } = React.useContext(CustomModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
  } = useForm({ resolver: yupResolver(FormValidationRules("form")) });

  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
    if (modalData.action === Action.CREATE) {
      dispatch(addUser(data));
    } else {
      dispatch(updateUser(data));
    }
    reset();
    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    if (modalData.action === Action.UPDATE) {
      reset(modalData.formData);
    }
  }, [modalData.action]);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Card
            style={{ boxShadow: "none", width: "100%", marginBlock: "1rem" }}
          >
            <CardContent sx={{ overflowY: "hidden" }}>
              <Grid container rowSpacing={3}>
                {FormFields().map((item: any, index: number) => (
                  <Grid key={index} item xs={12} sm={12}>
                    <CustomFormElements
                      item={item}
                      control={control}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <CustomCardFooter>
            {loading ? null : (
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(105deg, #57BC90 0%, #004B40 100%)",
                  width: "100%",
                  paddingBlock: ".9rem",
                  borderRadius: "10px",
                }}
                variant="contained"
                startIcon={""}
              >
                ADD CUSTOMER
              </Button>
            )}
          </CustomCardFooter>
        </form>
      )}
    </>
  );
}
