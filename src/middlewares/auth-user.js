export const authorizeUser = (req, res, next) => {
    //const { uid } = req.params; // El ID del usuario al que se refiere la ruta (por ejemplo, para editar su perfil)

    //console.log("ID del usuario autenticado:", req.usuario._id);


    // Comparar el ID del usuario autenticado con el ID de la ruta
    if (req.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "No tienes permisos para realizar esta acción"
        });
    }

    next(); // Si los IDs coinciden, continúa con la ejecución de la siguiente función
};
