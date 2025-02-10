import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export interface InputProps {
  value?: any;
  onChange: (value: any) => void;
  className?: any;
  id?: string;
  previewImage?: any;
  setPreviewImage?: any;
  previewOpen?: any;
  setPreviewOpen?: any;
  previewTitle?: any;
  setPreviewTitle?: any;
  fileList?: any;
  setFileList?: any;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageWall: React.FC<InputProps> = ({
  previewImage,
  setPreviewImage,
  previewOpen,
  setPreviewOpen,
  previewTitle,
  setPreviewTitle,
  fileList,
  setFileList,
  onChange,
}) => {
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div className="flex flex-col items-center">
      <AiOutlinePlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={async (e) => {
          handleChange(e);
          //const imagedata = await getBase64(e.file.originFileObj as RcFile);
          //console.log(imagedata, "IMAGEDATA");
          onChange(e);
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        className="z-[9999999]"
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <span className="text-zinc-400 text-xs">Max 3MB image size</span>
    </>
  );
};

export default ImageWall;
