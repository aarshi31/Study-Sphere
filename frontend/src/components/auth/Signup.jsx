// import React from 'react'
import React, { useState } from 'react';

import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "",
        file: ""

    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center min-h-screen max-w-7xl mx-auto'>
                <form action="" className='w-1/10 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>


                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text"
                            placeholder="eshat"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email"
                            placeholder="eshat@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                            placeholder="eshat@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="tutor"
                                    className="cursor-pointer" />
                                <Label htmlFor="r2">Tutor</Label>
                            </div>

                        </RadioGroup>

                    </div>
                    <Button type="submit" className="w-full my-4">Sign Up</Button>
                    <span className="text-sm">Account have an account? <Link to="/login" className='text-blue-600'>Log In</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup