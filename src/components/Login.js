import React from 'react'

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
      //this.setVisible = this.setVisible.bind(this);
    }
   
    render() {
      return(
        <div className='flex h-screen items-center justify-center bg-[#393955]'>
            <div className='flex w-3/5 h-3/5 shadow-2xl'>
                <div className='w-1/2 bg-[#33334C] flex flex-col text-white relative'>
                  <div className='flex w-full justify-center text-lg font-semibold absolute top-12'> Login </div>
                    <div className='flex flex-col w-full h-full items-center justify-center'>
                      <form className='flex flex-col gap-y-6'>
                        <div className='flex flex-col'>
                          <label>Username</label>
                          <input type='text' />
                        </div>
                        <div className='flex flex-col'>
                          <label>Password</label>
                          <input type='password' />
                        </div>
                      </form>
                    </div>
                </div>
                <div className='w-1/2 bg-white'>
                    Sag
                </div>
            </div>
        </div>
      )
    }
  }
  
  export default Login;