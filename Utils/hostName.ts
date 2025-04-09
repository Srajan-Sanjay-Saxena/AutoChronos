import { exec } from "child_process";

export const getHostName = () => {
    exec("hostname", (error,stdout,stderr)=>{
      if(error){
        console.error(`Error executing hostname: ${error?.message}`);
        throw new Error("Sorry cannot perform operation");
      }
  
      if(stderr){
        console.error(`stderr: ${stderr}`);
        throw new Error("Sorry cannot perform operation");
      }
      return stdout;
    });
  }