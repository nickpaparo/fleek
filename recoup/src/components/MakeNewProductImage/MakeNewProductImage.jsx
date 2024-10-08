import "./MakeNewProductImage.scss";

const MakeNewProductImage = () => {
    return ( 
        <>
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container white-background"
            >
              <div>
                <h3></h3>
                <div>
                  <p>Pro Tip</p>
                  <p>Upload clear images, with the product well lit</p>
                </div>
                <div id="drop-zone">
                  <label>Drop Images Here:</label>
                  <input type="file" id="file-input" name="image" accept="image/*"/>
                  <img id="preview" src="#" alt="Image preview"/>
                </div>
              </div>
            </motion.div>
        </>
     );
}
 
export default MakeNewProductImage;