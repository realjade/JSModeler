JSM.VectorMatrixMultiply4x4 = function (vector, matrix)
{
	var result = [];

	var a00 = vector[0];
	var a01 = vector[1];
	var a02 = vector[2];
	var a03 = vector[3];
	var b00 = matrix[0];
	var b01 = matrix[1];
	var b02 = matrix[2];
	var b03 = matrix[3];
	var b10 = matrix[4];
	var b11 = matrix[5];
	var b12 = matrix[6];
	var b13 = matrix[7];
	var b20 = matrix[8];
	var b21 = matrix[9];
	var b22 = matrix[10];
	var b23 = matrix[11];
	var b30 = matrix[12];
	var b31 = matrix[13];
	var b32 = matrix[14];
	var b33 = matrix[15];
		
	result[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	result[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	result[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	result[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;

	return result;
};

JSM.MatrixMultiply4x4 = function (matrix1, matrix2)
{
	var result = [];

	var a00 = matrix1[0];
	var a01 = matrix1[1];
	var a02 = matrix1[2];
	var a03 = matrix1[3];
	var a10 = matrix1[4];
	var a11 = matrix1[5];
	var a12 = matrix1[6];
	var a13 = matrix1[7];
	var a20 = matrix1[8];
	var a21 = matrix1[9];
	var a22 = matrix1[10];
	var a23 = matrix1[11];
	var a30 = matrix1[12];
	var a31 = matrix1[13];
	var a32 = matrix1[14];
	var a33 = matrix1[15];
	var b00 = matrix2[0];
	var b01 = matrix2[1];
	var b02 = matrix2[2];
	var b03 = matrix2[3];
	var b10 = matrix2[4];
	var b11 = matrix2[5];
	var b12 = matrix2[6];
	var b13 = matrix2[7];
	var b20 = matrix2[8];
	var b21 = matrix2[9];
	var b22 = matrix2[10];
	var b23 = matrix2[11];
	var b30 = matrix2[12];
	var b31 = matrix2[13];
	var b32 = matrix2[14];
	var b33 = matrix2[15];
		
	result[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	result[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	result[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	result[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
	result[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	result[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	result[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
	result[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
	result[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	result[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	result[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
	result[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
	result[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
	result[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
	result[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
	result[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;	
	
	return result;
};
