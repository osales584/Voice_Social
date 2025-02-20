import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"

export const getUserProfile= async (req, res) => {
    try{
        const users = req.usuario;

        return res.status(200).json({
            success: true,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        const user = req.usuario;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        // Verificar que ingresó la contraseña actual
        if (!oldPassword) {
            return res.status(400).json({
                success: false,
                message: "Debes ingresar tu contraseña actual",
            });
        }

        // Verificar si la contraseña actual es correcta
        const validPassword = await verify(user.password, oldPassword);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Contraseña actual incorrecta",
            });
        }

        // Verificar que la nueva contraseña no sea igual a la anterior
        const matchOldAndNewPassword = await verify(user.password, newPassword);
        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior",
            });
        }

        // Encriptar la nueva contraseña
        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(user._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.usuario;
        const  data  = req.body;

        console.log("UID desde el token:", uid);
         
        const user = await User.findById(uid);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const updateUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updateUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}