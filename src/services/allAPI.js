import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";


//registerAPI

export const registerAPI =async(user)=>{
return await commonAPI("POST",`${server_url}/register`,user,"")
}

//loginAPI

export const loginAPI =async(user)=>{
    return await commonAPI("POST",`${server_url}/login`,user,"")
    }

// addproject

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${server_url}/addProject`,reqBody,reqHeader)
}


// getHomeProject

export const getHomeProjectAPI = async()=>{
    return await commonAPI('GET',`${server_url}/homeproject`,"","")
}


// Userproject

export const getUserProjectsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/userproject`,"",reqHeader)
}


// getAllproject

export const getAllProjectsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${server_url}/allproject?search=${searchKey}`,"",reqHeader)
}

// editproject

export const editprojectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/projects/edit/${id}`,reqBody,reqHeader)
}

//deleteproject

export const deleteprojectAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/projects/remove/${id}`,{},reqHeader)
}

