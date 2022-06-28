export const seedData = {
    entries: [
        {
            description: 'Esto es un ejemplo de una tarea',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Esto es otro ejmplo de tarea que estamos poniendo aqui',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Tarea por concluir ya llenado mas contenido',
            status: 'finished',
            createdAt: Date.now() - 200000,
        },
        {
            description: 'Tarea de sofia pendiente',
            status: 'finished',
            createdAt: Date.now() - 200000,
        },
    ]
}