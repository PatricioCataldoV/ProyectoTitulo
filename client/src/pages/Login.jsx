import Form from "../components/Form";

function Login(){
    return (
        <div className="h-screen flex items-center justify-center">
            <Form route="/api/token/" method="login" class="bg-white p-4 rounded shadow-md max-w-md"/>
        </div>
)}

export default Login