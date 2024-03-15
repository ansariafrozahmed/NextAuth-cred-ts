"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type FieldType = {
  email?: string;
  password?: string;
};

const SignInForm: React.FC = () => {
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    setSubmitting(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.error) {
      // Handle sign-in error
      console.error(response.error);
    } else {
      // Redirect to home page
      setSubmitting(false);
      Swal.fire({
        title: "Success!",
        text: "Logged In Successfully!",
        icon: "success",
      }).then(() => {
        router.push("/");
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="w-[500px] shadow-md px-8 py-12 rounded-xl border">
      <Form
        name="Signin"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Email"
          className="text-xl"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter your correct email",
            },
          ]}
        >
          <Input className="border-2 border-gray-800" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="border-2 border-gray-800" />
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="w-full bg-gray-800 text-white"
            loading={submitting}
          >
            {submitting ? <span>Submitting</span> : <span>Submit</span>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
