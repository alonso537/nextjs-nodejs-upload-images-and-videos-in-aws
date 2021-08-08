import { Avatar, Badge, Button } from "antd";


const ImageForm = ({handleImage, preview, handleImageRemove, handleSubmit}) => {
  return (
    <>
      <form className="flex flex-col items-center mt-10">
        <input
          className="mt-3 "
          type="file"
          name="image"
          onChange={handleImage}
          accept="image/*"
        />

        {preview != '' ? (
          <Badge
            count="Eliminar"
            onClick={handleImageRemove}
            style={{ cursor: 'pointer' }}
            className="mt-2 "
          >
            <Avatar src={preview} width={80} />
          </Badge>
        ) : null}

        <div className="col">
          <Button
            onClick={handleSubmit}
            className="bg-gray-700 py-1 px-4 rounded-lg mt-10 mb-2 text-white font-bold shadow-lg"
            type="primary"
            size="large"
            shape="round"
          >
            {/* {values.loading ? 'Saving...' : 'Save & Continue'} Save */}Guardar
          </Button>
        </div>
      </form>
    </>
  );
};

export default ImageForm;
