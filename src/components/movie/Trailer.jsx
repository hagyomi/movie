import Modal from "../ui/Modal";

const Trailer = ({ open, setOpen, vid }) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} className="size-7/10 max-md:size-full max-md:px-[10vw] py-[10vh]">
        <iframe
          src={`https://www.youtube.com/embed/${vid?.key}`}
          title="YouTube video player"
          allowFullScreen
          className="size-full object-cover"
        ></iframe>
      </Modal>
    </>
  );
};

export default Trailer;
