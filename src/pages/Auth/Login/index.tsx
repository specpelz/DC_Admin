import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

const Login = () => {
  return (
    <div className="h-screen">
      <div className="lg:flex lg:items-center">
        <div className="hidden lg:block"
        style={{
          width:"50vw",
          height:"100vh",
          backgroundImage:"url(/loginImage.svg)",
          backgroundSize:"cover",
          backgroundPosition:"center"
        }}
        ></div>

        <div className="flex flex-col items-center w-full px-[16px] mt-[91px] md:px-[85px] lg:w-[50vw]  lg:mt-[unset]">
          <div className="w-full text-[20px] font-[600] text-BrandBlack1 text-center mb-[39px] lg:text-[32px] lg:font-[700] lg:text-left">
            Log into your account
          </div>

          <Form
            // form={form}
            layout="vertical"
            // onFinish={handleFinish}
            className="w-full "
          >
            <FormItem
              name="email"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1 ">
                  Email Address
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input 
              placeholder="Enter your email"
              className="text-[14px] px-[8px] py-[10px] rounded-[8px] text-BrandBlack1" />
            </FormItem>

            <FormItem
              className="mt-[20px]"
              label={
                <span className="text-[16px] font-[400] text-BrandBlack1">
                  Password
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password 
              placeholder="Enter your password"
              className="text-[14px] px-[8px] py-[10px] rounded-[8px]  h-[48px] text-BrandBlack1" />
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[56px] text-[16px] font-[400] mt-[72px]"
                // loading={isPending}
              >
                Login
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
