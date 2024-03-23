import {axiosAdmin} from "./axiosAdmin";

const adminService = {

}

adminService.registerAdmin = ({username, password}) => {
    return axiosAdmin.post('/admin/register', {username, password});
}

adminService.getAllAdmins = () => {
    return axiosAdmin.get('/admin');
}

export default adminService;