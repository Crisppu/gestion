 export const BaseEntity = {
    id:'id UUID DEFAULT uuid_generate_v4() PRIMARY KEY',
    createBy:'createBy UUID',
    createdAt:'createdAt TIMESTAMP',
    updateBy:'updateBy UUID',
    updatedAt:'updatedAt TIMESTAMP',
    deletedBy:'deletedBy UUID',
    deletedAt:'deletedAt TIMESTAMP',
    isDeleted:'isDeleted BOOLEAN DEFAULT true',
};

