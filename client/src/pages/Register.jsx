import Form from "../components/Form";

function Register(){
    return (
        <div className="h-screen flex items-center justify-center">
            <Form route="/api/user/register/" method="register" class="bg-white p-4 rounded shadow-md max-w-md"/>
        </div>
)}

export default Register