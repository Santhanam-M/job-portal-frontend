import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startGetApplicantProfile } from "../../actions/users-action";
import DashBoard from "../DashBoard";
import { startGetAllJobs } from '../../actions/jobs-action';
import { startGetApplications } from '../../actions/application-action';
import "chartkick/chart.js";
import { PieChart } from "react-chartkick";

const ApplicantDashboard = () => {

    const dispatch = useDispatch()

   //get profile when page reloads 
   useEffect(()=>{
    dispatch(startGetApplicantProfile())
   },[]) 

   //get all jobs
   useEffect(()=>{
    dispatch(startGetAllJobs())
   },[])

   //start get applications
   useEffect(()=>{
    dispatch(startGetApplications())
   },[])

   const allJobs = useSelector((state)=>{
    return state.jobs.data
   })

   const myApplications = useSelector((state)=>{
    return state.application.data
   })

   const shortlisted = myApplications.filter((ele)=>{
    return ele.status === 'ShortListed'
   })

   const frequency = allJobs.reduce((acc, cv)=>{
    if(cv.experience === 'fresher'){
      acc.fresher++
    }
    else{
      acc.experience++
    }
    return acc;
   },{fresher : 0 , experience : 0})

  return (
    <div className="container card rounded-5 p-4">
      <h5 className="text-uppercase fw-bold text-auth ps-1">
        DashBoard Details
      </h5>
      <hr />
      <div className="row">
        <DashBoard
          title="jobs available"
          bgColor="warning"
          iconClass="fa-solid fa-briefcase"
          value={allJobs.length}
        />

        <DashBoard
          title="Applied Jobs"
          bgColor="primary"
          iconClass="fas fa-tasks"
          value={myApplications.length}
        />

        <DashBoard
          title="Shortlisted"
          bgColor="success"
          iconClass="fa-solid fa-check"
          value={shortlisted.length}
        />
      </div>
      <br/>

      {allJobs.length > 0 && (<PieChart
      data={Object.entries(frequency)}
      />)}
      
    </div>
  );
};

export default ApplicantDashboard;
